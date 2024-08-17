document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    observeDOMChanges();
    removeInitialElements();
  }
};

const observeDOMChanges = () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(({ addedNodes }) => {
      addedNodes.forEach((node) => {
        if (node.nodeType === 1) { // Check if the added node is an element
          node.classList.contains('introjs-tooltipReferenceLayer') && node.remove();
          node.classList.contains('introjs-helperLayer') && removeElementWithOverlay(node);
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
};

const removeElementWithOverlay = (element) => {
  element.remove();
  removeElementsByClass('introjs-overlay');
};

const removeElementsByClass = (className) => {
  document.querySelectorAll(`.${className}`).forEach(element => element.remove());
};

const removeInitialElements = () => {
  removeElementsByClass('introjs-tooltipReferenceLayer');
  const helperElement = document.querySelector('.introjs-helperLayer');
  helperElement && removeElementWithOverlay(helperElement);
};
