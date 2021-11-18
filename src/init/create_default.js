import TLM_IMG_MAID from "../../assets/img/maid.png";
import TLM_IMG_CHAIR from "../../assets/img/chair.png";
import TLM_EN from "../../assets/lang/en.json";
import TLM_ZH from "../../assets/lang/zh.json";
import defaultMaidModel from "../../assets/model/maid/default.json"
import sr2MaidModel from "../../assets/model/maid/sr2.json"

Language.addTranslations("en", TLM_EN)
Language.addTranslations("zh", TLM_ZH)
export var createDefaultAction = new Action("tlm_utils.create_new_model", {
    name: "menu.tlm_utils.create_new_model",
    icon: "fa-file-alt",
    click: function () {
        createDefaultDialog.show();
    }
});

let defaultMaidModelDialog = new Dialog({
    title: "dialog.tlm_utils.create_new_model.maid.title",
    sidebar: {
        pages: {
            default: tl("dialog.tlm_utils.create_new_model.maid.default"),
            sr2: tl("dialog.tlm_utils.create_new_model.maid.little_maid_sr2"),
        },
        page: "default",
        onPageSwitch(page) {
            if (page === "sr2") {
                sr2MaidModelDialog.show();
                for (let key in sr2MaidModelDialog.sidebar.page_menu) {
                    let li = sr2MaidModelDialog.sidebar.page_menu[key];
                    li.classList.toggle("selected", key == page);
                }
            }
        }
    },
    form: {
        head: {
            label: "model.tlm_utils.maid.head",
            type: "checkbox",
            value: true
        },
        blink: {
            label: "model.tlm_utils.maid.blink",
            type: "checkbox",
            value: true
        },
        body: {
            label: "model.tlm_utils.maid.body",
            type: "checkbox",
            value: true
        },
        armLeft: {
            label: "model.tlm_utils.maid.arm_left",
            type: "checkbox",
            value: true
        },
        armRight: {
            label: "model.tlm_utils.maid.arm_right",
            type: "checkbox",
            value: true
        },
        legLeft: {
            label: "model.tlm_utils.maid.leg_left",
            type: "checkbox",
            value: true
        },
        legRight: {
            label: "model.tlm_utils.maid.leg_right",
            type: "checkbox",
            value: true
        },
        wingLeft: {
            label: "model.tlm_utils.maid.wing_left",
            type: "checkbox",
            value: false
        },
        wingRight: {
            label: "model.tlm_utils.maid.wing_right",
            type: "checkbox",
            value: false
        },
        tail: {
            label: "model.tlm_utils.maid.tail",
            type: "checkbox",
            value: false
        },
        ahoge: {
            label: "model.tlm_utils.maid.ahoge",
            type: "checkbox",
            value: false
        }
    },
    onConfirm: function (formData) {
        this.hide();
        createPresetModelWorkspace(formData, defaultMaidModel);
    }
});

let sr2MaidModelDialog = new Dialog({
    title: "dialog.tlm_utils.create_new_model.maid.title",
    sidebar: {
        pages: {
            default: tl("dialog.tlm_utils.create_new_model.maid.default"),
            sr2: tl("dialog.tlm_utils.create_new_model.maid.little_maid_sr2"),
        },
        page: "sr2",
        onPageSwitch(page) {
            if (page === "default") {
                defaultMaidModelDialog.show();
                defaultMaidModelDialog.sidebar.page = page;
                for (let key in defaultMaidModelDialog.sidebar.page_menu) {
                    let li = defaultMaidModelDialog.sidebar.page_menu[key];
                    li.classList.toggle("selected", key == page);
                }
            }
        }
    },
    form: {
        head: {
            label: "model.tlm_utils.maid.head",
            type: "checkbox",
            value: true
        },
        blink: {
            label: "model.tlm_utils.maid.blink",
            type: "checkbox",
            value: true
        },
        body: {
            label: "model.tlm_utils.maid.body",
            type: "checkbox",
            value: true
        },
        armLeft: {
            label: "model.tlm_utils.maid.arm_left",
            type: "checkbox",
            value: true
        },
        armRight: {
            label: "model.tlm_utils.maid.arm_right",
            type: "checkbox",
            value: true
        },
        legLeft: {
            label: "model.tlm_utils.maid.leg_left",
            type: "checkbox",
            value: true
        },
        legRight: {
            label: "model.tlm_utils.maid.leg_right",
            type: "checkbox",
            value: true
        }
    },
    onConfirm: function (formData) {
        this.hide();
        createPresetModelWorkspace(formData, sr2MaidModel);
    }
});

let createPresetModelWorkspace = function (formData, model) {
    let copyModel = JSON.parse(JSON.stringify(model));
    let bones = copyModel["geometry.model"]["bones"];
    for (let i in formData) {
        for (let j = 0; j < bones.length; j++) {
            if (bones[j].name === i && !formData[i]) {
                bones.splice(j, 1);
                break;
            }
        }
    }
    Codecs["bedrock_old"].load(copyModel, {path: ""});
}

let createEmptyWorkspace = function () {
    createDefaultDialog.hide();
    newProject(Formats["bedrock_old"]);
}

let createDefaultDialog = new Dialog("create_new_model", {
    title: "menu.tlm_utils.create_new_model",
    width: 800,
    singleButton: true,
    component: {
        data: function () {
            return {
                color_maid: "#17191d",
                color_chair: "#17191d",
                defaultMaidModelDialog: defaultMaidModelDialog,
                createEmptyWorkspace: createEmptyWorkspace
            }
        },
        template: `
            <div>
                <h1 style="text-align: center">${tl("dialog.tlm_utils.create_new_model.choose_type")}</h1>
                <ul style="display: grid; max-height: 465px; padding: 5px; overflow-y: auto; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); grid-gap: 5px;">
                <li :style="{'background-color': color_maid, 'cursor': 'pointer', 'text-align': 'center'}" v-on:click="defaultMaidModelDialog.show()" @mouseenter="color_maid='#3e90ff'" @mouseleave="color_maid = '#17191d'">
                    <img src="${TLM_IMG_MAID}" alt="" width="200px">
                    <h2 style="margin: 10px">${tl("dialog.tlm_utils.create_new_model.choose_type.maid")}</h2>
                </li>
                <li :style="{'background-color': color_chair, 'cursor': 'pointer', 'text-align': 'center'}" v-on:click="createEmptyWorkspace()" @mouseenter="color_chair='#3e90ff'" @mouseleave="color_chair = '#17191d'">
                    <img src="${TLM_IMG_CHAIR}" alt="" width="200px">
                    <h2 style="margin: 10px">${tl("dialog.tlm_utils.create_new_model.choose_type.chair")}</h2>
                </li>
                </ul>
            </div>
            `
    }
})