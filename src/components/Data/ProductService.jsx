
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';

export const ProductService = {

    getProductsData() {
        return [{
            id: '1000',
            name: 'Bamboo Watch',
            log: <Button label=" check History" link className='pi pi-external-link text-xs' />,
            image: 'bamboo-watch.jpg',
            totalCategories: 65,
            category: 'Accessories',
            totalProducts: 24,
            active: 'Check Actions History',
            Actions: "test",
        },
        {
            id: '1000',
            name: 'Bamboo Watch',
            log: <Button label=" check History" link className='pi pi-external-link text-xs' />,
            image: 'bamboo-watch.jpg',
            totalCategories: 65,
            category: 'Accessories',
            totalProducts: 24,
            active: 'Check Actions History',
            Actions: 'delete'
        },
        {
            id: '1000',
            name: 'Bamboo Watch',
            log: <Button label=" check History" link className='pi pi-external-link text-xs' />,
            image: 'bamboo-watch.jpg',
            totalCategories: 65,
            category: 'Accessories',
            totalProducts: 24,
            active: 'Check Actions History',
            Actions: 'delete'
        },
        {
            id: '1000',
            name: 'Bamboo Watch',
            log: <Button label=" check History" link className='pi pi-external-link text-xs' />,
            image: 'bamboo-watch.jpg',
            totalCategories: 65,
            category: 'Accessories',
            totalProducts: 24,
            active: 'Check Actions History',
            Actions: 'delete'
        },
    ]
    },
    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 5));
    },
    actionBody(){
        return(
            <>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2"  />
                <Button icon="pi pi-trash" rounded outlined severity="danger"  />
            </>
            
        )
    }

}