import { createNewPack } from "./pack/createpack";
import { bindPack } from "./pack/bindpack"
import { newWorkSpace } from "./model/workspace";
import { packInfoAction } from "./pack/packinfo";
import { saveNewModel, saveAsNewModel } from "./model/savemodel";

Plugin.register('tlm-utils', {
    name: '车万女仆模组插件',
    author: 'tartaric_acid',
    description: '专门为车万女仆模组制作模型包所设计的插件。',
    icon: 'card_membership',
    version: '1.0.0',
    variant: 'both',
    onload() {
        Language.data["menu.tlm_bar_menu"] = "车万女仆";
        // 添加主菜单
        new BarMenu("tlm_bar_menu", [
            'create_new_pack',
            'bind_pack',
            'tlm_pack_info',
            '_',
            'new_work_space',
            'save_new_model',
            'save_as_new_model'
        ]);
        MenuBar.update();
    },
    onunload() {
        // 删除主菜单按钮
        delete MenuBar.menues["tlm_bar_menu"];
        MenuBar.update();

        // 删除子菜单按钮
        createNewPack.delete();
        bindPack.delete();
        newWorkSpace.delete();
        packInfoAction.delete();
        saveNewModel.delete();
        saveAsNewModel.delete();
    }
});




