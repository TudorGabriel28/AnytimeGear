namespace AnytimeGear.Server.Validators.Interfaces;

public interface IValidator<T> where T : class
{
    public Task<ValidationResult> ValidateAsync(T model);
}
