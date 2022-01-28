import React, { useState, useEffect } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import RecordDataService from "../services/record.service";

export default function DataTable() {
    const [rowData, setRowData] = useState(null);

    useEffect(() => {
        RecordDataService.getAll()
            .then(response => {
                setRowData(response.data.data)
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div
                id="myGrid"
                style={{
                    height: '500px',
                    width: '70%',
                    margin: '16px auto'
                }}
                className="ag-theme-alpine"
            >
                <AgGridReact
                    autoGroupColumnDef={{
                        headerName: 'Group',
                        minWidth: 170,
                        field: 'athlete',
                        valueGetter: function (params) {
                            if (params.node.group) {
                                return params.node.key;
                            } else {
                                return params.data[params.colDef.field];
                            }
                        },
                        headerCheckboxSelection: true,
                        cellRenderer: 'agGroupCellRenderer',
                        cellRendererParams: { checkbox: true },
                    }}
                    defaultColDef={{
                        editable: true,
                        enableRowGroup: true,
                        enablePivot: true,
                        enableValue: true,
                        sortable: true,
                        resizable: true,
                        filter: true,
                        flex: 1,
                        minWidth: 100,
                    }}
                    suppressRowClickSelection={true}
                    groupSelectsChildren={true}
                    debug={true}
                    rowSelection={'multiple'}
                    rowGroupPanelShow={'always'}
                    pivotPanelShow={'always'}
                    enableRangeSelection={true}
                    paginationAutoPageSize={true}
                    pagination={true}
                    rowData={rowData}
                >
                    <AgGridColumn field="date" />
                    <AgGridColumn field="name" />
                    <AgGridColumn field="number" />
                    <AgGridColumn field="distance" />
                </AgGridReact>
            </div>
        </div>
    );
};
