const list = [
    {
        resourceId: "tab1",
        title: "tab1",
        resUrl: "/",
        resType: "01",
        resIcon: "home",
        children: []
    },
    {
        resourceId: "tab2",
        title: "tab2",
        resUrl: "/docs",
        resType: "01",
        resIcon: "record",
        children: []
    },
    {
        resourceId: "tab3",
        title: "流程应用",
        resUrl: "/schemeList",
        resType: "01",
        resIcon: "record",
        children: []
    },
    // {
    //     resourceId: "tab4",
    //     title: "流程应用2",
    //     resUrl: "/schemeList2",
    //     resType: "01",
    //     resIcon: "record",
    //     children: []
    // },
    // {
    //     resourceId: "table",
    //     title: "table",
    //     resUrl: "/table",
    //     resType: "01",
    //     resIcon: "record",
    //     children: []
    // }
];

export default {
    'GET /api/v1/getMenuList': (req: any, res: any) => {
        res.json({
            code: 200,
            data: list
        });
    },
};
