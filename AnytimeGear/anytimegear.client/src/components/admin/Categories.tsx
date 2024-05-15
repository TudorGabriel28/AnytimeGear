import { useEffect, useState } from "react";
import { categoryService } from "../../services/category.service";
import { ICategory } from "../../models/category.model";

export function CategoriesPage() {
    const [categories, setCategories] = useState<ICategory[]>();

    useEffect(() => {
        getCategories();
    }, []);
    async function getCategories() {
        await categoryService.fetchAll()
        .then((response) => {
            setCategories(response);
        }, (error) => {
            console.log(error);
        });
    }

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
                    <tr key={category.id}>
                        <td>{category.id}</td>
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