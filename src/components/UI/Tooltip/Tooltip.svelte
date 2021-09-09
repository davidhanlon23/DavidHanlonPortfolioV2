<script lang="ts">
    // TODO: properly set these vars
    // import { Tooltip as Tippy } from 'react-tippy';
    import tippy from "sveltejs-tippy";

    import 'react-tippy/dist/tippy.css';
    // const props = {
    //     content: "<span class='tooltip'>Styled tooltip text</span>",
    //     placement: "bottom"
    // };
    export let trigger;
    export let content;
    export let position;
    export let action;
    export let theme;
    export let component;
    export let interactive = false;
    export let arrow;
    export let distance;
    export let open;
    export let onShow;
    export let onHide;
</script>
<!-- <Tippy
      open={open}
      onShow={onShow}
      onHide={onHide}
      theme={theme || 'dark'}
      html={component}
      size="small"
      title={content}
      position={position}
      trigger={action}
      arrow={arrow}
      animation="fade"
      interactive={interactive}
      distance={distance}
    >
      {trigger}
    </Tippy> -->