using AnytimeGear.Server.Dtos;
using AnytimeGear.Server.Validators.Interfaces;
using System.Text.RegularExpressions;

namespace AnytimeGear.Server.Validators;

public class RegisterRequestValidator : IRegisterRequestValidator
{
    public Task<ValidationResult> ValidateAsync(RegisterRequestDto model)
    {
        var errorMap = new Dictionary<string, List<string>>();

        if (!IsValidEmail(model.Email))
        {
            errorMap.Add(nameof(RegisterRequestDto.Email), ["Invalid email address."]);
        }

        if (string.IsNullOrEmpty(model.FirstName))
        {
            errorMap.Add(nameof(RegisterRequestDto.FirstName), ["First name is required."]);
        }

        if (string.IsNullOrEmpty(model.LastName))
        {
            errorMap.Add(nameof(RegisterRequestDto.LastName), ["Last name is required."]);
        }

        var (isValidPassword, passwordValidationErrors) = IsValidPassword(model.Password);

        if (!isValidPassword)
        {
            errorMap.Add(nameof(RegisterRequestDto.Password), passwordValidationErrors);
        }

        var (isValidPhoneNumber, phoneNumberValidationErrors) = IsValidPhoneNumber(model.PhoneNumber);

        if (!isValidPhoneNumber)
        {
            errorMap.Add(nameof(RegisterRequestDto.PhoneNumber), phoneNumberValidationErrors);
        }

        if (errorMap.Count > 0)
        {
            
            return Task.FromResult(new ValidationResult(errorMap));
        }

        return Task.FromResult(new ValidationResult());
    }

    private bool IsValidEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            return false;

        string emailPattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";

        return Regex.IsMatch(email, emailPattern);
    }

    private (bool IsValid, List<string> Errors) IsValidPassword(string password)
    {
        var errors = new List<string>();

        if (string.IsNullOrEmpty(password))
        {
            errors.Add("Password is required.");
        }
        else
        {
            if (password.Length < 8)
            {
                errors.Add("Password must be at least 8 characters long.");
            }

            if (!Regex.IsMatch(password, @"[A-Z]"))
            {
                errors.Add("Password must contain at least one uppercase letter.");
            }

            if (!Regex.IsMatch(password, @"[a-z]"))
            {
                errors.Add("Password must contain at least one lowercase letter.");
            }

            if (!Regex.IsMatch(password, @"\d"))
            {
                errors.Add("Password must contain at least one digit.");
            }

            if (!Regex.IsMatch(password, @"[^a-zA-Z0-9]"))
            {
                errors.Add("Password must contain at least one special character.");
            }
        }

        if(errors.Count == 0)
        {
            return (true, []);
        }
        
        return (false, errors);
    }

    private (bool IsValid, List<string> Errors) IsValidPhoneNumber(string phoneNumber)
    {
        if (string.IsNullOrWhiteSpace(phoneNumber))
            return (false, ["Phone number is required."]);

        string phonePattern = @"^\+?[1-9]\d{1,14}$";

        var validFormat = Regex.IsMatch(phoneNumber, phonePattern);

        if (!validFormat)
        {
            return (false, ["Invalid phone number format."]);
        }

        return (true, []);
    }
}
