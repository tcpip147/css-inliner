# css-inliner

```
var CSSInliner = new CSSInliner();
CSSInliner.inline(document.getElementById("target"));

// As-is
<style>
    .target { font-size: 14px; }
</style>
<div class="target">Hello World!</div>

// To-be
<div class="target" style="font-size: 14px;">Hello World!</div>
```

```
// If you want to inject inline styles to all elements in html.
CSSInliner.inlineAll();
```