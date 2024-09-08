export class HotSpot {
  constructor(labelText, descriptionText, uuid) {
    this.uuid = uuid;
    this.marker = { x: 0, y: 0 }; // Initial marker position
    this.label = { x: 0, y: 0, text: labelText, centerX:0, centerY:0, w:0, h:0 }; // Initial label position and text
    this.blueMarker = { x: 0, y: 0, text: labelText, centerX: 0, centerY:0 }; // Initial label position and text
    this.description = { position: 'top-right', text: descriptionText, x:0, y:0 }; // Initial description position and text
    this.observers = []; // Array to hold observers
  }

  // Method to update marker position
  updateMarkerPosition(x, y) {
    this.marker.x = x;
    this.marker.y = y;
    // Notify any observers about the change
    this.notifyObservers();
  }

  // // Method to update label position
  updateLabelPosition(x, y) {
    this.label.x = x;
    this.label.y = y;
    this.label.centerX = x + this.label.w/2
    this.label.centerY = y + this.label.h/2
    // Notify any observers about the change
    console.log({centerX: this.label.centerX })
    this.notifyObservers();
  }
  updateLabelText_W_H(text, w, h) {
    console.log({w,h})
    this.label.text = text
    this.label.w = w
    this.label.h = h
    this.updateLabelPosition(this.label.x, this.label.y)
    // Notify any observers about the change
    // this.notifyObservers();
  }
  // updateLabelCenter(centerX, centerY) {
  //   this.label.centerX = centerX
  //   this.label.centerY = centerY
   
  //   // Notify any observers about the change
  //   this.notifyObservers();
  // }
  updateBlueMarkerCenter(centerX, centerY) {
    this.blueMarker.centerX = centerX
    this.blueMarker.centerY = centerY
   
    // Notify any observers about the change
    this.notifyObservers();
  }
  updateblueMarkerPosition(x, y) {
    this.blueMarker.x = x;
    this.blueMarker.y = y;
    // Notify any observers about the change
    this.notifyObservers();
  }
  updateDescriptionPosition(x, y) {
    this.description.x = x;
    this.description.y = y;
    // Notify any observers about the change
    this.notifyObservers();
  
  }
  // // Method to update description position
  // updateDescriptionPosition(position) {
  //   this.description.position = position;
  //   // Notify any observers about the change
  //   this.notifyObservers();
  // }

  addObserver(observer) {
    this.observers.push(observer);
  }

  // Method to remove observers
  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  // Method to notify observers about changes
  notifyObservers() {
    this.observers.forEach(observer => {
      observer.update(this);
    });
  }
}

