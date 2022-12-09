import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="insert-in-list"
export default class extends Controller {
  static targets = ["items", "form"]
  static values = { position: String }

  connect() {
    // console.log("I am still here.")
    // console.log(this.element)
    // console.log(this.itemsTarget)
    // console.log(this.formTarget)
    this.csfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content")
  }

  send(event) {
    event.preventDefault()

    const url = this.formTarget.action
    const option = {
      method: "POST",
      headers: { "Accept": "application/json", "X-CSRF-Token": this.csfToken },
      body: new FormData(this.formTarget)
    }

    fetch(url, option)
    .then(response => response.json())
    .then((data) => {
      if (data.inserted_item) {
        this.itemsTarget.insertAdjacentHTML(this.positionValue, data.inserted_item)
      }
      this.formTarget.outerHTML = data.form
    })
  }
}
