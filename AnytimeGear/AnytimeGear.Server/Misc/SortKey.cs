//using System.Linq.Expressions;

//namespace AnytimeGear.Server.Misc;

//public class SortKey
//{
//    public string Value { get; }
//    public Expression<Func<Product, object>> Expression { get; }
//    public static SortKey Price => new("price");
//    public static SortKey CreatedAt => new("createdAt");
//    public static ICollection<SortKey> Values => [Price, CreatedAt];

//    private SortKey(string value)
//    {
//        _value = value;
//    }

//    public override string ToString()
//    {
//        return _value;
//    }  

//}
