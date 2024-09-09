export class HotSpot {
  constructor(labelText, width, height, descriptionText, uuid) {
    this.uuid = uuid;
    this.marker = { x: 0, y: 0 };
    this.label = { x: 0, y: 0, text: labelText, centerX: 0, centerY: 0, w: width, h: height };
    this.blueMarker = { x: 0, y: 0, centerX: 0, centerY: 0 };
    this.description = { position: 'top-left', text: descriptionText, x: 0, y: 0, width: 0, height: 0 };
    this.observers = [];
  }

  updateDescriptionPosition(position) {
    this.description.position = position; // Update the position string
    this.notifyObservers(); // Notify observers of the change
  }
  updateBlueMarkerCenter(centerX, centerY) {
    this.blueMarker.centerX = centerX;
    this.blueMarker.centerY = centerY;
    
    this.notifyObservers();
  }
  updateblueMarkerPosition(x, y) {
    this.blueMarker.x = x;
    this.blueMarker.y = y;
    this.notifyObservers();
  }
  updateLabelPosition(x, y) {
    this.label.x = x;
    this.label.y = y;
    this.notifyObservers();
  }
  updateLabelCenter(centerX, centerY){
    this.label.centerX = centerX;
    this.label.centerY = centerY;
    this.notifyObservers();
  }
  updateLabelText_W_H(text, w, h) {
    this.label.text = text;
    this.label.w = w;
    this.label.h = h;
    this.updateLabelCenter(this.label.x + this.label.w / 2, this.label.y + this.label.h / 2);
  }




  updateDescriptionPosition(x, y) {
    this.description.x = x;
    this.description.y = y;
    this.notifyObservers();
  }
updateDescriptionWH(w, h) { 
  this.description.width = w;
  this.description.height = h;
  this.notifyObservers();
}
  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers() {
    this.observers.forEach((observer) => {
      observer.update(this);
    });
  }
}
