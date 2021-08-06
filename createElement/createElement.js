// 获取一个树形结构的对象,遍历属性转成dom节点
function createElement(tree, element) {
  if (!Array.isArray(tree)) throw new Error("tree is not Array");

  var singleTag = [""];
  tree.forEach(function (node) {
    var tag = node.key;
    var content = node.content || "";

    if (!tag) return "";

    var attrString = Object.keys(node.attr || {})
      .map(function (o) {
        return " " + o + "=" + '"' + node.attr[o] + '"';
      })
      .join("");

    var startTag = "<" + tag + attrString + ">";
    var endTag = "</" + tag + ">";

    if (!element) {
      element = startTag + content;
    } else {
      element = element + startTag + content;
    }

    if (node.children) {
      element = element + createElement(node.children);
    }

    element = element + endTag;
  });

  return element;
}
