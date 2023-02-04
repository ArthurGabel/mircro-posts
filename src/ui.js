export const UICtrl = (function(){
  const UISelectors = {
    postsContainer: '.postsContainer',
    cardForm: '.card-form',
    titleInput: '#title',
    bodyInput: '#body',
    formID: '#id',
    postSubmitBtn: '.post-submit',
    updateBtn: '.update-post',
    backBtn: '.back-btn',
    formEnd: '.form-end',
    posts: '#posts'
  };

  return {
    getSelectors: function() {
      return UISelectors;
    },
    displayPosts: function(posts) {
      let output = '';
  
      posts.forEach(function(post) {
        output += `
          <div class="card mb-3">
            <div class="card-body">
              <h4 class="card-title">${post.title}</h4>
              <p class="card-text">${post.body}</p>
              <a href="#" class="edit card-link" data-id="${post.id}">
                <i class="fa fa-pencil"></i>
              </a>
              <a href="#" class="delete card-link" data-id="${post.id}">
                <i class="fa fa-remove"></i>
              </a>
            </div>
          </div>
        `;
      })

      document.querySelector(UISelectors.posts).innerHTML = output;
    },
    showEditState: function(data, type) {
      if(type === 'edit'){
        UICtrl.clrFields();
  
        document.querySelector(UISelectors.titleInput).value = data.title;
        document.querySelector(UISelectors.bodyInput).value = data.body;
        document.querySelector(UISelectors.formID).value = data.id;
  
        document.querySelector(UISelectors.postSubmitBtn).style.display = 'none';

        const updateBtn = document.createElement('button');
        updateBtn.className = 'update-post btn btn-warning btn-block';
        updateBtn.textContent = 'Update Post';

        const backBtn = document.createElement('button');
        backBtn.className = 'back-btn btn btn-light btn-block';
        backBtn.textContent = 'Back'
  
        const parent = document.querySelector(UISelectors.cardForm);
        const formEnd = document.querySelector(UISelectors.formEnd);
        parent.insertBefore(updateBtn, formEnd);
        parent.insertBefore(backBtn, formEnd);
      } else {
        document.querySelector(UISelectors.updateBtn).remove();
        document.querySelector(UISelectors.backBtn).remove();
        document.querySelector(UISelectors.postSubmitBtn).style.display = 'inline';

        UICtrl.clrFields();
      }

    },
    showAlert: function(message, className){
      UICtrl.clrAlert();

      const div = document.createElement('div');
      div.className = className;
      div.appendChild(document.createTextNode(message));

      const parent = document.querySelector(UISelectors.postsContainer);
      const posts = document.querySelector(UISelectors.posts);

      parent.insertBefore(div, posts);

      setTimeout(function(){
        UICtrl.clrAlert();
      }, 3000);
    },
    clrAlert: function() {
      const currentAlert = document.querySelector('.alert');

      if(currentAlert){
        currentAlert.remove();
      }
    },
    clrFields: function() {
      document.querySelector(UISelectors.titleInput).value = '';
      document.querySelector(UISelectors.bodyInput).value = '';
    }
  }
})();
