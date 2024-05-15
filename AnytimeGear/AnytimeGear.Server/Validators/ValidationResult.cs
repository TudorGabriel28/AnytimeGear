namespace AnytimeGear.Server.Validators;

public class ValidationResult
{
    public bool IsValid { get; set; }
    public Dictionary<string, List<string>> Errors { get; set; }

    public ValidationResult()
    {
        IsValid = true;
        Errors = new Dictionary<string, List<string>>();
    }

    public ValidationResult(Dictionary<string, List<string>> errors)
    {
        IsValid = false;
        Errors  =errors;
    }
}