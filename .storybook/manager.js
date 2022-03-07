import { addons } from '@storybook/addons';
import theme from './theme';

addons.setConfig({
  theme: theme,
});

/**
 * Provides a simple theme solution based on if the current url is a story or page. It will
 * add `story` or `page` to the body tag 
 */
(function(history){
  var pushState = history.pushState;

  var addTheme = function(body, url) {
    var type = url.endsWith('story') ? 'story' : 'page';
    body.classList.remove('story')
    body.classList.remove('page')
    body.classList.add(type)
  }

  window.addEventListener('load', function() { 

    var existCondition = setInterval(function() {
      var previewIframe = document.getElementById('storybook-preview-iframe');
      var doc = previewIframe.contentDocument ? previewIframe.contentDocument : previewIframe.contentWindow.document;

      if (doc && doc.getElementsByClassName('sb-show-main').length) {
          addTheme(doc.getElementsByClassName('sb-show-main')[0], window.location.href)
          clearInterval(existCondition);
        }
      }, 100);
  }, false);

  
  history.pushState = function(state, val, url) {
    var previewIframe = document.getElementById('storybook-preview-iframe');
    var doc = previewIframe.contentDocument ? previewIframe.contentDocument : previewIframe.contentWindow.document;
    addTheme(doc.getElementsByClassName('sb-show-main')[0], url)
    return pushState.apply(history, arguments);
  };
  
})(window.history);