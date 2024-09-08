export class HotSpot {
  constructor(labelText, descriptionText, uuid) {
    this.uuid = uuid;
    this.marker = { x: 0, y: 0 };
    this.label = { x: 0, y: 0, text: labelText, centerX: 0, centerY: 0, w: 0, h: 0 };
    this.blueMarker = { x: 0, y: 0, centerX: 0, centerY: 0 };
    this.description = { position: 'top-right', text: descriptionText, x: 0, y: 0 };
    this.observers = [];
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
    this.label.centerX = x + this.label.w / 2;
    this.label.centerY = y + this.label.h / 2;
    this.notifyObservers();
  }

  updateLabelText_W_H(text, w, h) {
    this.label.text = text;
    this.label.w = w;
    this.label.h = h;
    this.updateLabelPosition(this.label.x, this.label.y);
  }




  updateDescriptionPosition(x, y) {
    this.description.x = x;
    this.description.y = y;
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
