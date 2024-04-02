import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from '@tanstack/react-table';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ArrowDownSquareFill, ArrowUpSquareFill } from 'react-bootstrap-icons';
import { addIngredient, getIngredientsByUserId, searchIngredient } from '../apiCalls/cqAPI';
import AuthContext from '../contexts/index';
import Ingredient from '../entities/Ingredient';
import AddIngredientModal from './AddIngredientModal';
import IndeterminateCheckbox from './IndeterminateCheckbox';

const IngredientListContainer = () => {
    const [currPage, setCurrPage] = useState(0);
    const [ingredientsList, setIngredientsList] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState('');
    const [rowsSelected, setRowsSelected] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user, oldIngredientsList, setOldIngredientsList } = useContext(AuthContext);

    useEffect(() => {
        console.log(ingredientsList);
        if (ingredientsList.length > 0) return;
        setLoading(true);

        setIngredientsList([...new Set(ingredientsList.map(ingredient => ingredient))]);
        console.log("useEffect on user");
        getIngredientsByUserId(user.email, user.credential)
            .then(res => {
                setLoading(false);
                if (!res) {
                    return;
                }
                console.log(res);

                const uniqueIngredientLabels = [...new Set(res.map(ingredient => ingredient.ingredientLabel))];
                setOldIngredientsList(uniqueIngredientLabels);
                const uniqueIngredientString = uniqueIngredientLabels.join(" and ");
                searchIngredient(uniqueIngredientString)
                    .then((data) => {
                        setIngredientsListCallback(data);
                    });

                setIngredientsList([...new Set(ingredientsList.map(ingredient => ingredient))]);
                setLoading(false);
            })
            .catch(() => {
                setOldIngredientsList([]);
                setIngredientsList([]);
                setLoading(false);
            }

            );
    }, []);

    useEffect(() => { //POST to db on ingr list state change
        console.log("useEffect on ingredientsList");
        if (ingredientsList.length) {
            // addIngredient(user.email, ingredientsList[0], 1, user.credential);
            ingredientsList.map((ingrObj) => {
                if (!(oldIngredientsList.includes(ingrObj.label))) {
                    addIngredient(user.email, ingrObj, 1, user.credential);
                    setOldIngredientsList([...oldIngredientsList, ingrObj.label]);
                }
            });
        }
    }, [ingredientsList.length]);

    const setIngredientsListCallback = (data) => {
        console.log("setIngredientsListCallback");
        const ingrObjList = data.parsed.map(ingredientObj => new Ingredient(ingredientObj.food.foodId, ingredientObj.food.label, ingredientObj.food.nutrients, ingredientObj.food.image));
        // setIngredientsList(ingredientsList => [...ingredientsList, ...ingrObjList]); //ADDING
        //adding only unique ingredients
        const idSet = new Set(ingredientsList.map(ingredientObj => ingredientObj.id));
        const combinedIngredientsList = [...ingredientsList, ...ingrObjList];
        const uniqueIngredientObjList = combinedIngredientsList.filter(ingredientObj => {
            if (idSet.has(ingredientObj.id)) {
                return false;
            }
            idSet.add(ingredientObj.id);
            return true;
        });
        const { toggleAllRowsSelected } = table;
        setRowsSelected([]);
        toggleAllRowsSelected(false);
        setIngredientsList(ingredientsList => [...ingredientsList, ...uniqueIngredientObjList]); //ADDING
        // console.log(JSON.stringify(user))
        console.log(data);
        // addIngredient(user.email, ingredientsList[0], 1, user.credential)

    };

    const deleteIngredientsCallback = () => {
        const idsToDelete = table.getSelectedRowModel().rows.map(rowObj => rowObj.original.id);
        const ingredientListAfterDeletion = ingredientsList.filter(ingredientObj => {
            if (idsToDelete.includes(ingredientObj.id)) {
                return false;
            }
            return true;
        });
        const { toggleAllRowsSelected } = table;
        toggleAllRowsSelected(false);
        setRowsSelected([]);
        setIngredientsList(ingredientListAfterDeletion);

    };

    const setFilteringCallback = (e) => setFiltering(e.target.value);

    const data = useMemo(() => ingredientsList, [ingredientsList]); // changed from blank dependency (think perf)
    /**@type import('@tanstack/react-table').ColumnDef<any> */
    const columns = [
        {
            // header: ' ', //image
            id: 'selection',
            // header: () => <IndeterminateCheckbox className={"form-check"} />,
            header: ({ table }) => (
                <IndeterminateCheckbox
                    className={"form-check"}
                    {...{
                        checked: table.getIsAllRowsSelected(),
                        indeterminate: table.getIsSomeRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler()
                    }}
                />
            ),
            accessorFn: (row => row.image),
            cell: row => (
                <div>
                    <img
                        className={`img-responsive thumbnail ${row.row.getIsSelected() ? 'selected' : ''}`}
                        src={row.row.original.image}
                        width="65"
                        data-testid={row.row.original.id}
                        onClick={row.row.getToggleSelectedHandler()}
                    />
                </div>
            ),
            enableGlobalFilter: false,
            enableSorting: false
        },
        {
            header: 'Ingredient',
            accessorFn: (row => row.label)
        },
        {
            header: 'Calories',
            accessorFn: (row => row.nutrients.ENERC_KCAL),
            enableGlobalFilter: false

        },
        {
            header: 'Protein',
            accessorFn: (row => row.nutrients.PROCNT ? row.nutrients.PROCNT + "g" : ""),
            enableGlobalFilter: false
        },
        {
            header: 'Carbs',
            accessorFn: (row => row.nutrients.CHOCDF ? row.nutrients.CHOCDF + "g" : ""),
            enableGlobalFilter: false

        },
        {
            header: 'Fiber',
            accessorFn: (row => row.nutrients.FIBTG ? row.nutrients.FIBTG + "g" : ""),
            enableGlobalFilter: false
        },

    ];
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
            rowSelection: rowsSelected,
        },
        initialState: {
            pagination: {
                pageSize: 6,
            },
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onRowSelectionChange: setRowsSelected,
        enableRowSelection: true,
    });

    // useEffect(() => {
    //     console.log(table.getSelectedRowModel());
    // }, [table.getSelectedRowModel().rows.length]);

    return (
        <div className="container d-flex flex-column align-items-center mb-4" id='my-fridge-container'>
            <div className="mx-5">
            </div>
            <AddIngredientModal ingredientsList={ingredientsList} setIngredientsListCallback={setIngredientsListCallback}
                setFilteringCallback={setFilteringCallback} filteredIngredientsCount={table.getFilteredRowModel().rows.length}
                rowsSelected={rowsSelected}
                rowObjArray={table.getSelectedRowModel().rows}
                // selectedRowObjArray={table.getSelectedRowModel() ? table.getSelectedRowModel().rows : []}
                deleteIngredientsCallback={deleteIngredientsCallback}
            />
            {/* {console.log(table.getFilteredRowModel().rows.length)} */}
            {ingredientsList.length > 0 &&
                <table className="table table-striped table-hover table-responsive mt-2">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}<span> </span>
                                    {
                                        {
                                            asc: <ArrowDownSquareFill size={25} className="toggleArrows" />,
                                            desc: <ArrowUpSquareFill size={25} className="toggleArrows" />
                                            // asc: <ArrowUpSquareFill size={25} className="toggleArrows" />,
                                            // desc: <ArrowDownSquareFill size={25} className="toggleArrows" />
                                        }[header.column.getIsSorted() ?? null]//accessing obj literal w/ conditional arr index
                                    }
                                </th>)}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {/* {console.log(table.getRowModel().rows)} */}
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {/* {console.log(cell.row.original.image)} */}
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            }

            {loading && <div className="pt-4 d-flex justify-content-center">
                <div className="spinner"></div>
            </div>}

            {!loading && ingredientsList.length === 0 &&
                <div className="pt-4 d-flex justify-content-center">
                    No ingredients found.
                </div>}

            {ingredientsList.length > 0 &&
                <nav className="float-end">
                    <ul className="pagination">
                        <li key="back-arrow" className="page-item">
                            <button className={`page-link ${!table.getCanPreviousPage() && "disabled"}`}
                                data-testid="prev-page-btn"
                                disabled={!table.getCanPreviousPage()}
                                onClick={() => {
                                    table.previousPage();
                                    setCurrPage(currPage - 1);
                                }}>
                                <span>&laquo;</span>
                            </button>
                        </li>
                        {table.getPageOptions().map(pgNum => (
                            <li key={pgNum} className="page-item ">
                                <button onClick={() => {
                                    table.setPageIndex(pgNum);
                                    setCurrPage(pgNum);
                                }}
                                    data-testid={`page-btn-${pgNum}`}
                                    disabled={currPage == pgNum}
                                    className={`page-link ${currPage == pgNum && "disabled"} arrowBtn`}
                                >{pgNum + 1}
                                </button>
                            </li>
                        ))}
                        <li className="page-item">
                            <button className={`page-link ${!table.getCanNextPage() && "disabled"} arrowBtn`}
                                data-testid="next-page-btn"
                                onClick={() => {
                                    table.nextPage();
                                    setCurrPage(currPage + 1);
                                }}
                                disabled={!table.getCanNextPage()}
                            >&raquo;</button>
                        </li>
                    </ul>
                </nav>
            }
        </div>

    );
};

IngredientListContainer.propTypes = {
    setIngredientsListCallback: PropTypes.func,
    ingredientsList: PropTypes.arrayOf(Ingredient)
};

export default IngredientListContainer;