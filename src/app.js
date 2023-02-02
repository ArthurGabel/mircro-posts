import {http} from './http';
import {UICtrl} from './ui';

const App = (function() {
  const loadEventListeners = function() {
    const UISelectors = UICtrl.getSelectors();

    document.querySelector(UISelectors.postSubmitBtn).addEventListener('click', postSubmit);
    document.querySelector(UISelectors.posts).addEventListener('click', postDelete);
    document.querySelector(UISelectors.posts).addEventListener('click', postEditState);
    document.querySelector(UISelectors.cardForm).addEventListener('click', postUpdate);
    document.querySelector(UISelectors.cardForm).addEventListener('click', backBtn);
  };

  const getPosts = function() {
    http.get('http://localhost:3000/posts')
      .then(data => UICtrl.displayPosts(data))
      .catch(err => console.log(err));
  };

  const postSubmit = function(e) {
    const UISelectors = UICtrl.getSelectors();
    const title = document.querySelector(UISelectors.titleInput).value;
    const body = document.querySelector(UISelectors.bodyInput).value;

    if(title !== '' && body !== ''){
      const data = {
        title,
        body
      };
  
      http.post('http://localhost:3000/posts', data)
        .then(() => {
          UICtrl.clrFields();
          UICtrl.showAlert('Post added!', 'alert alert-success');
          getPosts();
        })
        .catch(err => console.log(err));
    } else {
      UICtrl.showAlert('Please, fill in all the fields.', 'alert alert-danger');
    }

    e.preventDefault();
  };
  
  const postEditState = function(e) {
    if(e.target.parentElement.classList.contains('edit')){
      const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
      const body = e.target.parentElement.previousElementSibling.textContent;
      const id = e.target.parentElement.dataset.id;

      const data = {
        title,
        body,
        id
      }

      UICtrl.showEditState(data, 'edit');
    }

    e.preventDefault();
  };

  const postUpdate = function(e) {
    if(e.target.classList.contains('update-post')){
      const UISelectors = UICtrl.getSelectors();
      const title = document.querySelector(UISelectors.titleInput).value;
      const body = document.querySelector(UISelectors.bodyInput).value;
      const id = document.querySelector(UISelectors.formID).value;

      if(title !== '' && body !== ''){
        const data = {
          title,
          body
        }
  
        http.put(`http://localhost:3000/posts/${id}`, data)
          .then((data) => {
            UICtrl.showEditState('', 'updated');
            UICtrl.showAlert('Post updated!', 'alert alert-success');
            getPosts();
          })
          .catch(err => console.log(err));
      } else {
        UICtrl.showAlert('Please, fill in all the fields.', 'alert alert-danger');
      }
    }

    e.preventDefault();
  }

  const postDelete = function(e) {
    if(e.target.parentElement.classList.contains('delete')){
      if(confirm('Are you sure?')){
        const id = e.target.parentElement.dataset.id;
        
        http.delete(`http://localhost:3000/posts/${id}`)
          .then(() => {
            UICtrl.clrFields();
            UICtrl.showAlert('Post deleted.', 'alert alert-warning');
            getPosts();
          })
          .catch(err => console.log(err));
      }
    }

    e.preventDefault();
  };

  const backBtn = function(e) {
    if(e.target.classList.contains('back-btn')){
      UICtrl.showEditState('', 'back');
    }

    e.preventDefault();
  }

  return {
    init: function() {
      getPosts();

      loadEventListeners();
    }
  }
})()

App.init();