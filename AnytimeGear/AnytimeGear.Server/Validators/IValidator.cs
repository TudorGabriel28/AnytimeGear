namespace AnytimeGear.Server.Validators;

public interface IValidator<T>  where T : class
{
    public Task<ValidationResult> ValidateAsync (T model);
}
