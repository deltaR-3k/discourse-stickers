import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { getOwner } from "@ember/application";

export default class Stickers extends Component {
  @tracked stickerImages = JSON.parse(settings.sticker_images);
  @service site;
  @service capabilities;
  
  @action
  pick() {
    let stickerImage = document.querySelectorAll(".sticker-pack span.sticker-holder img.sticker:hover");
    stickerImage.forEach((sticker) => {
      sticker.classList.add("picked");
      sticker.addEventListener("animationend", () => {
        let markupComposer = `![${sticker.alt}|75x65](${sticker.getAttribute("markdownUrl")})`;
        let markupChatComposer = `![${sticker.alt}|75x65](${sticker.getAttribute("markdownUrl")})`;
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
