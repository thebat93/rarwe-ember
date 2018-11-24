import Controller from "@ember/controller";

export default Controller.extend({
  isEditing: false,

  actions: {
    // переключить флаг редактирования
    edit() {
      this.set('isEditing', true);
    },

    // обновить (сохранить) описание
    async save() {
      // модель = группа
      let band = this.model;
      // PATCH-запрос
      await band.save();
      // сбрасываем флаг редактирования
      this.set('isEditing', false);
    }

    // toggleIsEditing() {
    //   this.toggleProperty("isEditing");
    // }
  }
});
