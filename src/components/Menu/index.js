const { app } = require('electron')

const CustomMenu = () => [
    {
        label: "Options",
        submenu: [
            {
                label: "Radio1",
                type: "radio",
                checked: true
            },
            {
                label: "Radio2",
                type: "radio",
            },
            {
                label: "Checkbox1",
                type: "checkbox",
                checked: true,
                click: (item) => {
                    console.log("item is checked? " + item.checked);
                }
            },
            {type: "separator"},
            {
                label: "Checkbox2",
                type: "checkbox",
                checked: false,
                click: (item) => {
                    console.log("item is checked? " + item.checked);
                }
            },
            {
                label: "Radio Test",
                submenu: [
                    {
                        label: "Sample Checkbox",
                        type: "checkbox",
                        checked: true
                    },
                    {
                        label: "Radio1",
                        checked: true,
                        type: "radio"
                    },
                    {
                        label: "Radio2",
                        type: "radio"
                    },
                    {
                        label: "Radio3",
                        type: "radio"
                    },
                    { type: "separator" },
                    {
                        label: "Radio1",
                        checked: true,
                        type: "radio"
                    },
                    {
                        label: "Radio2",
                        type: "radio"
                    },
                    {
                        label: "Radio3",
                        type: "radio"
                    }
                ]
            },
            {
                label: "zoomIn",
                role: "zoomIn"
            },
            {
                label: "zoomOut",
                role: "zoomOut"
            },
            {
                label: "Radio1",
                type: "radio"
            },
            {
                label: "Radio2",
                checked: true,
                type: "radio"
            },
        ]
    }
];

module.exports = { CustomMenu }
