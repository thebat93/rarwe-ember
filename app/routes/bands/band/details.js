import Route from "@ember/routing/route";

export default Route.extend({
  // подразумевается по умолчанию
  // model() {
  //     return this.modelFor('bands.band');
  // }

  // хук, который вызывается когда происходит выход из роута
  resetController(controller, isExiting) {
    if (isExiting) {
      controller.setProperties({
        isEditing: false,
        showErrors: { description: false }
      });
    }
  },

  actions: {
    // вызывается перед переходом на другой роут
    willTransition(transition) {
      if (this.controller.isEditing) {
        let leave = window.confirm("Are you sure?");
        if (!leave) {
          // отмена перехода
          transition.abort();
        }
      }
    }
  }
});
