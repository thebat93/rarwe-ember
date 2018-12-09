import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorize(xhr) {
    // в сервисе лежит то, что возвращается в методе authenticate()
    let { token } = this.get('session.data.authenticated');
    // для каждого запроса на сервер прописываем хедер Authorization
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
  }
});
