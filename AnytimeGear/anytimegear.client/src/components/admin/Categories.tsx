import { useCallback, useEffect, useState } from "react";
import { categoryService } from "../../services/category.service";

export function CategoriesPage () {
    const [categories, setCategories] = useState<ICategory[]>();

    const getCategories = useCallback(async () => {
        const categories: ICategory[] = await categoryService.fetchAll();
        setCategories(categories);
    }, [])

    useEffect(() => {
        getCategories()
            .catch(console.error);
    }, [getCategories])

    const contents = categories === undefined
        ? <p><em>Loading...</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {categories.map(category =>
                    <tr key={category.name}>
                        <td>{category.name}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tabelLabel">Categories</h1>
            {contents}
        </div>
    );
   
}