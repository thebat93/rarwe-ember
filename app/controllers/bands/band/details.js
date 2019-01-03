import Controller from "@ember/controller";
import { computed } from '@ember/object';

export default Controller.extend({
  isEditing: false,

  actions: {
    // переключить флаг редактирования
    edit() {
      this.set('isEditing', true);
    },
  
    showErrors: computed('_showErrors', {
      get() {
        return this._showErrors || { description: false };
      },
      set(key, value) {
        this.set('_showErrors', value);
        return this._showErrors;
      }
    }),

    // обновить (сохранить) описание
    async save() {
      // модель = группа
      let band = this.model;
      // При сохранении описания можно отображать ошибки валидации
      this.set('showErrors.description', true);

      if (band.validations.isValid) {
        // PATCH-запрос
        await band.save();
        // сбрасываем флаг редактирования
        this.set('isEditing', false);
      }
    }

    // toggleIsEditing() {
    //   this.toggleProperty("isEditing");
    // }
  }
});
