import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { getOwner } from "discourse-common/lib/get-owner";

export default class Stickers extends Component {
  @tracked stickerImages = JSON.parse(settings.sticker_images);
  
  @action
  pick() {
    let stickerImage = document.querySelectorAll(".sticker-pack span.sticker-holder img.sticker:hover");
    stickerImage.forEach((sticker) => {
      sticker.classList.add("picked");
      sticker.addEventListener("animationend", () => {
        let markupComposer = `\n[wrap=sticker]![${sticker.alt}|180x180](${sticker.getAttribute("markdownUrl")})[/wrap]\n`;
        let markupChatComposer = `\n![${sticker.alt}|180x180](${sticker.getAttribute("markdownUrl")})\n`;
        if (this.args.model?.customPickHandler) {
          this.args.model.customPickHandler(markupChatComposer);
        } else {
          getOwner(this).lookup("service:app-events").trigger("composer:insert-text", markupComposer);
        }
        this.args.closeModal();
      });
    });
  }  
}
