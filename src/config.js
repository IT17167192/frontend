export const API = "http://localhost:8000/api";

export const ROUTES = {
    landing_page: '/',
    login_page: '/login',
    sign_up_page: '/signUp',
    add_data_extension: '/data/extension',
    manage_package: '/admin/managePackages',
    assign_user_package: '/admin/assignPackage'
}

export const columns = {
    package_table_columns : [
        {
            label :  "Package Id",
            field : "packageId",
            sort : 'asc',
            width : 100
        },
        {
            label : "Package Name",
            field: "packageName",
            sort:  "asc",
            width: 100
        },
        {
            label : "Package Data",
            field: "packageData",
            sort:  "asc",
            width: 100
        },
        {
            label : "Package Price",
            field: "price",
            sort:  "asc",
            width: 100
        },
        {
            label : "Credit Limit",
            field: "maxOutstanding",
            sort:  "asc",
            width: 100
        },
        {
            label : "Price per Extension Unit",
            field: "pricePerExtendUnit",
            sort:  "asc",
            width: 100
        },
        {
            label : "Action",
            field: "action",
            sort:  "asc",
            width: 100
        },
    ],
    assgign_table_columns : [
        {
            label :  "User Id",
            field : "id",
            sort : 'asc',
            width : 100
        },
        {
            label : "Email",
            field: "email",
            sort:  "asc",
            width: 100
        },
        {
            label : "Name",
            field: "name",
            sort:  "asc",
            width: 100
        },
        {
            label : "Action",
            field: "action",
            sort:  "asc",
            width: 100
        },
    ]
}
