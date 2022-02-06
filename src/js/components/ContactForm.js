'use strict';

import parse from 'parse-form';
import {addClass, removeClass, hasClass} from '../utility/ClassnameUtils';
import {getParentByClass, getParentByTag} from '../utility/ParentUtils';
import {scrollTo} from '../utility/Scroller';



const isProcessingClass = 'contact-form-is-processing';
const inputErrorClass = 'input-error';


function toggleInputErrorClass(input, isValid) {
   isValid ? removeClass(input, inputErrorClass) : addClass(input, inputErrorClass);
}

function isInputValid (input, toggleErrorClass = true) {
     let isRequired = input.hasAttribute('required'),
         val = input.value,
         type = input.getAttribute('type'),
         name = input.getAttribute('name'),
         isValid = true;

     type = typeof type === 'string' ? type.toLowerCase() : null;

     if (isRequired && val === '') {
         isValid = false;
     }
     else if (isRequired && type === 'email') {
         isValid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
     }
     else if (type === 'number') {
         isValid = Number(val) == val && val % 1 === 0;
     }

     if (toggleErrorClass) {
         toggleInputErrorClass(input, isValid);
     }

     return isValid;
}

function getInputError (input) {
   let errorMsg = input.getAttribute('data-error-msg'),
       placeholder = input.getAttribute('placeholder'),
       id = input.getAttribute('id'),
       name = input.getAttribute('name'),
       label = name ? document.querySelector('label[for="' + name + '"]') : null,
       val = input.value;

   if (!errorMsg) {
      if (label) {
         errorMsg = label.innerText;
      }
      else if (placeholder) {
         errorMsg = placeholder;
      }
      else if (id) {
         errorMsg = id.charAt(0).toUpperCase() + id.slice(1);
      }
      else if (name) {
         errorMsg = name.charAt(0).toUpperCase() + name.slice(1);
      }
      else {
         errorMsg = 'Input';
      }

      errorMsg += val ? ' is invalid.' : ' is required';
   }

   return errorMsg.replace(/_-/g, ' ');
}

function getErrorMsgHtml(err = []) {
   let ul = document.createElement('ul');

   const errors = [...new Set(err)];

   errors.forEach(err => {
      let li = document.createElement('li');
      li.innerHTML = err;
      ul.appendChild(li);
   });

   return ul;   
}


function enableForm (form) {
   removeClass(form, isProcessingClass);
   
   [...form.querySelectorAll('button')].forEach(btn => {
      btn.removeAttribute('disabled');
   });
   
   scrollTo(form);
}

function disableForm(form) {
   addClass(form, isProcessingClass);
   
   [...form.querySelectorAll('button')].forEach(btn => {
      btn.setAttribute('disabled', 'disabled');
   });
}

function showErrors(container, errors = []) {
   container.innerHTML = '';
   container.appendChild(getErrorMsgHtml(errors));
   addClass(container, 'is-visible');
}

export function init() {
   const form = document.querySelector('#form-contact');
   
   if (!form) {
      return;
   }
   
   const inputs = form.querySelectorAll('input, select, textarea');
   const contactFormErrors = form.querySelector('.contact-form-errors');
   
   
   form.onsubmit = ev => {
      ev.preventDefault();
      
      if (hasClass(form, isProcessingClass)) {
         return;
      }
      
      let errors = [];
      
      for (let i = 0; i < inputs.length; i++) {
         inputs[i].value = inputs[i].value.trim().replace(/\s{2,}/g, ' ');
            
         if (!isInputValid(inputs[i], true)) {
            errors.push(getInputError(inputs[i]));
         }
      }
      
      if (errors.length) {
         //showErrors(contactFormErrors, errors);
        // return;
      }
      
      disableForm(form);
      

      const formData = parse(form, true),
          data = formData.body ? formData.body : {},
          request = new XMLHttpRequest();
   
      const defaultError = ['Sorry, an error occurred while processing your request.'];
   
      request.open('POST', '/api/contact.php', true);
      request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      request.responseType = 'json';
      request.send(JSON.stringify(data));

      
      request.onload = () => {
         let response = request.response || request.responseText;
         
         if (typeof response === 'string') {
            response = JSON.parse(response);
         }
         
         if (response && request.status === 200 && response.success) {
            const successMsgHtml = `
               <div class="contact-form-success">
                  <p>
                     <i class="icon-ok-circled"></i>&nbsp; Your message has been sent!
                  </p>
               </div>
            `;
            
             form.innerHTML = successMsgHtml;
             removeClass(contactFormErrors, 'is-visible');
             enableForm(form);
             return;
         }
         
         const serverErrors = response.errors ? response.errors : defaultError;
         showErrors(contactFormErrors, serverErrors);
         enableForm(form);
      };

      request.onerror = () => {
         showErrors(contactFormErrors, defaultError);
         enableForm(form);
      };

      request.ontimeout = () => {
         showErrors(contactFormErrors, defaultError);
         enableForm(form);
      };      
      
   };
}

export default {
	init: init
};