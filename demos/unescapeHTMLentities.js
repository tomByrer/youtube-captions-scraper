export const unescapeHTMLentities = (str) => {
  const reEscape = /&(?:apos|#39|quot|#34|lt|#60|gt|#62|amp|#38);/g
  return str.replace(reEscape, (tag)=>({
    '&apos;':"'",
    '&#39;':"'",
    '&quot;':'"',
    '&#34;':'"',
    '&lt;':'<',
    '&#60;':'<',
    '&gt;':'>',
    '&#62;':'>',
    '&amp;':'&',
    '&#38;':'&',
  })[tag]
  )   
}

console.log('&#60;div title=&#34;text&quot;&#62;1 &amp; &apos;2&#39;&lt;/div&gt;')
console.log(unescapeHTMLentities('&#60;div title=&#34;text&quot;&#62;1 &amp; &apos;2&#39;&lt;/div&gt;'))
// <div title="text">1 & 2</div>