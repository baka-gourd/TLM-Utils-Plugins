import defaultMaidModel from "../../assets/model/maid/default.json";
import sr2MaidModel from "../../assets/model/maid/sr2.json";
import maidModelChooseVue from "./maid_model.vue";

export var createDefaultAction = new Action("tlm_utils.create_new_model", {
    name: "menu.tlm_utils.create_new_model",
    icon: "fa-file-alt",
    click: function () {
        createDefaultDialog.show();
    }
});


export var createDefaultDialog = new Dialog("create_new_model", {
    title: "menu.tlm_utils.create_new_model",
    width: 800,
    singleButton: true,
    component: maidModelChooseVue
});

export var defaultMaidModelDialog = new Dialog({
    title: "dialog.tlm_utils.create_new_model.maid.title",
    sidebar: {
        pages: {
            default: tl("dialog.tlm_utils.create_new_model.maid.default"),
            sr2: tl("dialog.tlm_utils.create_new_model.maid.little_maid_sr2")
        },
        page: "default",
        onPageSwitch(page) {
            if (page === "sr2") {
                sr2MaidModelDialog.show();
                for (let k in sr2MaidModelDialog.sidebar["page_menu"]) {
                    let li = sr2MaidModelDialog.sidebar["page_menu"][k];
                    li.classList.toggle("selected", k === page);
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

var sr2MaidModelDialog = new Dialog({
    title: "dialog.tlm_utils.create_new_model.maid.title",
    sidebar: {
        pages: {
            default: tl("dialog.tlm_utils.create_new_model.maid.default"),
            sr2: tl("dialog.tlm_utils.create_new_model.maid.little_maid_sr2")
        },
        page: "sr2",
        onPageSwitch(page) {
            if (page === "default") {
                defaultMaidModelDialog.show();
                for (let k in defaultMaidModelDialog.sidebar["page_menu"]) {
                    let li = defaultMaidModelDialog.sidebar["page_menu"][k];
                    li.classList.toggle("selected", k === page);
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

var createPresetModelWorkspace = function (formData, model) {
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
};