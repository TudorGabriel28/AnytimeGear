import { useEffect, useState } from "react";
import { ISubcategory } from "../../models/subcategory.model";
import { subcategoryService } from "../../services/subcategory.service";

export function SubcategoriesPage() {
    const [subcategories, setSubcategories] = useState<ISubcategory[]>();

    useEffect(() => {
        getSubcategories();
    }, []);
    async function getSubcategories() {
        await subcategoryService.fetchAll()
        .then((response) => {
            setSubcategories(response);
        }, (error) => {
            console.log(error);
        });
    }

    const contents = subcategories === undefined
        ? <p><em>Loading...</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Category Name</th>
                </tr>
            </thead>
            <tbody>
                {subcategories.map(subcategory =>
                    <tr key={subcategory.id}>
                        <td>{subcategory.id}</td>
                        <td>{subcategory.name}</td>
                        <td>{subcategory.category.name}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tabelLabel">Subcategories</h1>
            {contents}
        </div>
    );
   
}