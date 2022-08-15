const sb = require("https://github.com/myeung18/kube-service-bindings")

try {
    bindingInfo = sb.getBinding("POSTGRESQL")

    console.log(bindingInfo)
} catch (err) {
    console.log(err)
}
