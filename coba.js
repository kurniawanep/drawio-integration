function DiagramEditor(config, ui, done, initialized, urlParams) {
  this.config = config || {};
  this.ui = ui || "min"; // Minimal UI for less distraction
  this.done = done;
  this.initialized = initialized;
  this.urlParams = urlParams;

  var self = this;

  // Set the default domain and any necessary URL parameters for initializing the editor
  this.drawDomain = "https://embed.diagrams.net/";
  this.urlParams = this.urlParams || [
    "embed=1",
    "ui=" + this.ui,
    "proto=json",
    "libraries=1",
  ];

  this.handleMessageEvent = function (evt) {
    if (self.frame != null && evt.source === self.frame.contentWindow) {
      try {
        var msg = JSON.parse(evt.data);
        if (msg != null) {
          self.handleMessage(msg);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Add event listener for messages from the iframe
  window.addEventListener("message", this.handleMessageEvent, false);
}

DiagramEditor.prototype.createFrame = function () {
  var frame = document.createElement("iframe");
  frame.setAttribute("frameborder", "0");
  frame.style.cssText = this.frameStyle;
  frame.src = this.getFrameUrl();
  return frame;
};

DiagramEditor.prototype.getFrameUrl = function () {
  return this.drawDomain + "?" + this.urlParams.join("&");
};

// Function to start the diagram editor with an empty diagram
DiagramEditor.prototype.startEmptyDiagram = function (containerId) {
  this.container = document.getElementById(containerId);
  this.frame = this.createFrame();
  this.container.appendChild(this.frame);
};

// Setup your diagram editor on page load
window.onload = function () {
  var diagramEditor = new DiagramEditor();
  diagramEditor.startEmptyDiagram("graphContainer"); // Assume you have a div with id 'graphContainer'
};
