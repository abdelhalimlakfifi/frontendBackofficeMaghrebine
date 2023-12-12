import React, { useState, useEffect } from 'react'
import Layout from '../layouts/layouts'
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { Chart } from 'primereact/chart';


export default function Dashboard() {
    const items = [{ label: 'Maghrebin' }, { label: 'Dashboard' }];
    const home = { icon: 'pi pi-home', url: '/' }


    const [sales] = useState([
        { product: 'Rbati', lastYearSale: 51, thisYearSale: 40, lastYearProfit: 54406, thisYearProfit: 43342 },
        { product: 'Fassi', lastYearSale: 83, thisYearSale: 9, lastYearProfit: 423132, thisYearProfit: 312122 },
        { product: 'Amazighi', lastYearSale: 38, thisYearSale: 5, lastYearProfit: 12321, thisYearProfit: 8500 },
        { product: 'Sehraoui', lastYearSale: 49, thisYearSale: 22, lastYearProfit: 745232, thisYearProfit: 65323 },
        { product: 'Modern', lastYearSale: 17, thisYearSale: 79, lastYearProfit: 643242, thisYearProfit: 500332 },
    ]);

    const lastYearSaleBodyTemplate = (rowData) => {
        return `${rowData.lastYearSale}%`;
    };

    const thisYearSaleBodyTemplate = (rowData) => {
        return `${rowData.thisYearSale}%`;
    };

    const lastYearProfitBodyTemplate = (rowData) => {
        return `${formatCurrency(rowData.lastYearProfit)}`;
    };

    const thisYearProfitBodyTemplate = (rowData) => {
        return `${formatCurrency(rowData.thisYearProfit)}`;
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const lastYearTotal = () => {
        let total = 0;

        for (let sale of sales) {
            total += sale.lastYearProfit;
        }

        return formatCurrency(total);
    };

    const thisYearTotal = () => {
        let total = 0;

        for (let sale of sales) {
            total += sale.thisYearProfit;
        }

        return formatCurrency(total);
    };

    const headerGroup = (
        <ColumnGroup>
            <Row>
                <Column header="Category" rowSpan={3} />
                <Column header="Sale Rate" colSpan={4} />
            </Row>
            <Row>
                <Column header="Sales" colSpan={2} />
                <Column header="Profits" colSpan={2} />
            </Row>
            <Row>
                <Column header="Last Year" sortable field="lastYearSale" />
                <Column header="This Year" sortable field="thisYearSale" />
                <Column header="Last Year" sortable field="lastYearProfit" />
                <Column header="This Year" sortable field="thisYearProfit" />
            </Row>
        </ColumnGroup>
    );

    const footerGroup = (
        <ColumnGroup>
            <Row>
                <Column footer="Totals:" colSpan={3} footerStyle={{ textAlign: 'right' }} />
                <Column footer={lastYearTotal} />
                <Column footer={thisYearTotal} />
            </Row>
        </ColumnGroup>
    );


    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Women', 'Men', 'Kids'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        '#bbab83', 
                        '#655445', 
                        '#9D9FA1'
                    ],
                    hoverBackgroundColor: [
                        '#bbab83', 
                        '#655445', 
                        '#9D9FA1'
                    ]
                }
            ]
        };
        const options = {
            cutout: '60%'
        };

        setChartData(data);
        setChartOptions(options);
    }, []);
    return (
        <Layout>
            <BreadCrumb model={items} home={home} />
            <div className="items-center px-4 py-8 m-auto">
                <div className="flex flex-wrap pb-3 bg-white divide-y rounded-sm shadow-lg xl:divide-x xl:divide-y-0">
                    {/* Card 1 */}
                    <div className="w-full p-2 xl:w-1/4 sm:w-1/2">
                        <div className="flex flex-col">
                            <div className="flex flex-row items-center justify-between px-4 py-4">
                            <div className="flex mr-4">
                                <span className="items-center px-4 py-4 m-auto border-2 border-light-gold rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="items-center w-8 h-8 m-auto text-light-gold hover:text-light-gold" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                </svg>
                                </span>
                            </div>
                            <div className="flex-1 pl-1">
                                <div className="text-xl font-medium text-gray-600">6,427</div>
                                <div className="text-sm text-gray-400 sm:text-base">Active Sessions</div>
                            </div>
                            </div>
                            <div className="px-4 pt-px">
                                <div className="w-full h-2 bg-gray-200 rounded-md hover:bg-gray-300">
                                    <div className="h-2 bg-light-gold rounded-md" style={{ width: '100%' }}></div>
                                </div>
                            
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="w-full p-2 xl:w-1/4 sm:w-1/2">
                        <div className="flex flex-col">
                            <div className="flex flex-row items-center justify-between px-4 py-4">
                            <div className="flex mr-4">
                                <span className="items-center px-4 py-4 m-auto border-light-gold border-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="items-center w-8 h-8 m-auto text-light-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                </span>
                            </div>
                            <div className="flex-1 pl-1">
                                <div className="text-xl font-medium text-gray-600">78%</div>
                                <div className="text-sm text-gray-400 sm:text-base">
                                Add to Cart
                                </div>
                            </div>
                            </div>
                            <div className="px-4 pt-px">
                                <div className="w-full h-2 bg-gray-200 rounded-md hover:bg-gray-300">
                                    <div className="h-2 bg-light-gold rounded-md" style={{ width: '100%' }}></div>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                    
                    {/* Card 3 */}
                    <div className="w-full p-2 xl:w-1/4 sm:w-1/2">
                        <div className="flex flex-col">
                            <div className="flex flex-row items-center justify-between px-4 py-4">
                            <div className="flex mr-4">
                                <span className="items-center px-4 py-4 m-auto border-2 border-light-gold rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="items-center w-8 h-8 m-auto text-light-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                                </span>
                            </div>
                            <div className="flex-1 pl-1">
                                <div className="text-xl font-medium text-gray-600">563</div>
                                <div className="text-sm text-gray-400 sm:text-base">
                                Newsletter Sign Ups
                                </div>
                            </div>
                            </div>
                            <div className="px-4 pt-px">
                                <div className="w-full h-2 bg-gray-200 rounded-md hover:bg-gray-300">
                                    <div className="h-2 bg-light-gold rounded-md light-gold" style={{ width: "100%" }}></div>
                                </div>
                            
                            </div>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="w-full p-2 xl:w-1/4 sm:w-1/2">
                        <div className="flex flex-col">
                            <div className="flex flex-row items-center justify-between px-4 py-4">
                                <div className="flex mr-4">
                                    <span className="items-center px-4 py-4 m-auto border-2 border-light-gold rounded-full ">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="items-center w-8 h-8 m-auto text-light-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    </span>
                                </div>
                                <div className="flex-1 pl-1">
                                    <div className="text-xl font-medium text-gray-600">&#36;56,474</div>
                                    <div className="text-sm text-gray-400 sm:text-base">
                                    Active Sessions
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 pt-px">
                                <div className="w-full h-2 bg-gray-200 rounded-md hover:bg-gray-300">
                                    <div className="h-2 bg-light-gold rounded-md " style={{ width: '100%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex space-x-8'>
                <div className=' w-3/4'>
                    <DataTable value={sales} headerColumnGroup={headerGroup} footerColumnGroup={footerGroup} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="product" />
                        <Column field="lastYearSale" body={lastYearSaleBodyTemplate} />
                        <Column field="thisYearSale" body={thisYearSaleBodyTemplate} />
                        <Column field="lastYearProfit" body={lastYearProfitBodyTemplate} />
                        <Column field="thisYearProfit" body={thisYearProfitBodyTemplate} />
                    </DataTable>
                </div>

                <div className='flex items-center'>
                    <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
                </div>
                
            </div>
        </Layout>
    )
}

