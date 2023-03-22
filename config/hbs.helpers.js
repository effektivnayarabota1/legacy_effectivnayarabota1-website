export default {
  base64(img) {
    if (!img.data) return;
    else return `data:${img.contentType};base64,${img.data.toString("base64")}`;
  },

  image(context, options) {
    if (!this.img || !this.img.data) return `ui/image.empty`;
    if (options == "thumbnail") return `ui/image.thumbnail`;
    return `ui/image`;
  },

  letters(context, options) {
    let ret = "";
    for (let letter of context) {
      ret = ret + "<div class='header_letter' ><h2>" + letter + "</h2></div>";
    }
    return ret;
  },

  textarea(options) {
    return new hbs.SafeString(
      `<textarea class="footer_text-input">${options.fn(this)}</textarea>`
    );
  },

  select_check(context, options) {
    const root = options.data.root;
    if (!root) return;

    const object = root.header || root.footer;

    const selectValue = object.mixBlendMode;
    if (selectValue == context) return "selected";
    else return;
  },

  radio_check(context, options) {
    const root = options.data.root;
    let blockType;
    if (!root) return;

    if (root.block) blockType = root.block.type;
    if (root.page) blockType = root.page.objectFit;
    if (root.header) blockType = root.header.objectFit;
    if (root.footer) blockType = root.footer.objectFit;

    const radioType = context;
    if (blockType == radioType) return "checked";
    else return;
  },
};
