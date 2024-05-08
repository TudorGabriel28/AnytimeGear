import { useEffect, useState } from "react";
import { ISubCategory } from "../../models/subcategory.model";
import { subCategoryService } from "../../services/subcategory.service";

export function SubCategoriesPage() {
    const [subCategories, setSubCategories] = useState<ISubCategory[]>();

    useEffect(() => {
        getSubCategories();
    }, []);
    async function getSubCategories() {
        await subCategoryService.fetchAll()
        .then((response) => {
            setSubCategories(response.items);
        }, (error) => {
            console.log(error);
        });
    }

    const contents = subCategories === undefined
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
                {subCategories.map(subcategory =>
                    <tr key={subcategory.id}>
                        <td>{subcategory.id}</td>
                        <td>{subcategory.name}</td>
                        <td>{subcategory.categoryName}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tabelLabel">SubCategories</h1>
            {contents}
        </div>
    );
   
}