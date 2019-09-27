<template>
  <div>
    <h1>Icons (SVG)</h1>
    <p>Create SVG elements from the files in the `_source/_icon/` folder.</p>

    <CodeExample :code="code.default" title="Content Image" description="A basic <img> element.">
      <div style="width: 40px;">
        <IconSVG handle="plus" />
      </div>
    </CodeExample>

    <CodeExample dark :code="code.changeColors" title="Content Image" description="A basic <img> element.">
      <div style="width: 40px;">
        <IconSVG handle="plus" color-var="white" />
        <IconSVG handle="plus" :replacements="{ '<polygon': `<polygon fill='yellow'` }" />
      </div>
    </CodeExample>

    <CodeExample :code="code.image" title="Content Image" description="A basic <img> element.">
      <div style="width: 40px;">
        <IconSVG handle="close" background style="width: 40px; height: 40px;" />
      </div>
    </CodeExample>

    <CodeExample :code="code.background" title="Content Image" description="A basic <img> element.">
      <div style="width: 40px;">
        <IconSVG handle="minus" image />
      </div>
    </CodeExample>

    <PropsTable :props="props" />
  </div>
</template>

<script>
import IconSVG from 'Components/icon_svg/IconSVG.vue';
import CodeExample from 'Starter/style_inventory/vue/CodeExample';
import PropsTable from 'Starter/style_inventory/vue/PropsTable';

export default {
  components: {
    IconSVG,
    CodeExample,
    PropsTable,
  },
  data() {
    return {
      code: false,
      props: false,
    };
  },
  created() {
    this.code = {
      default: `<IconSVG handle="plus" />`,
      changeColors:
`<IconSVG handle="plus" color-var="white" />
<IconSVG handle="plus" :replacements="{ '<polygon': \`<polygon fill='yellow'\` }" />`,
      image: `<IconSVG handle="close" background />`,
      background: `<IconSVG handle="minus" image />`,
    };
    this.props = [
      { name: 'alt', type: 'String', description: `Sets the alt attribute on the <img> element.` },
      { name: 'background', type: 'Boolean', description: `Turns the image into a background image that fits to the width and height of the container element.` },
      { name: 'caption', type: 'String', description: `Adds a <figcaption> element below the image.` },
      { name: 'loading', type: 'String', default: 'lazy', description: `Determines if the image should be lazy loaded. Accepts: 'lazy', 'auto', or 'eager'.` },
      { name: 'placeholder', type: 'String', description: `The default image shown in none of the sources can be displayed.` },
      { name: 'sources', type: 'Array', description: `An array of objects that create <source> elements. The last object in the array will be displayed as an <img> element.` },
      { name: 'sources.height', type: 'Number', description: `Sets the height of the <img> element.` },
      { name: 'sources.intrinsicsize', type: 'String', description: `Sets the 'intrinsicsize' attribute used to set the size before lazy loading has loaded the image.` },
      { name: 'sources.media', type: 'String', description: `Add a media query to the <source> element.` },
      { name: 'sources.sizes', type: 'String', default: '100vw', description: `Sets the 'sizes' attribute on the <img> element.` },
      { name: 'sources.type', type: 'String', description: `Set the type attribute on the <source> element. For example, if the image is a WEBP file set this to 'image/webp'` },
      { name: 'sources.src', type: 'String', description: `Sets the 'src' attribute on the <source> element.` },
      { name: 'sources.srcset', type: 'String', description: `Sets the 'srcset' attribute on the <source> element.` },
      { name: 'sources.width', type: 'Number', description: `Sets the width of the <img> element.` },
      { name: 'type', type: 'String', default: 'div', description: `When used as a background, the wrapper element can be changed to a different element type.` },
    ]
  },
};
</script>