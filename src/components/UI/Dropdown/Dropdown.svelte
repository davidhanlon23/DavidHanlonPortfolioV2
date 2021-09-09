<script lang="ts">
    export let className = '';
    export let dropClassName = '';
    export let button;
    export let icon = '';
    export let text = '';
    export let trigger;
    export let id = '';

    // function clickHandler(e) {
    //   const targetElement = document.getElementById(id);
    //   if (targetElement && !targetElement.contains(e.target)) {
    //     // Clicked outside the dropdown
    //     setDropDown(false);
    //   }
    // }
    // // initiate the event handler
    // window.addEventListener('click', clickHandler, true);

    // // this will clean up the event every time the component is re-rendered
    // return function cleanup() {
    //   window.removeEventListener('click', clickHandler);
    // };

    const display = openDropDown ? 'block' : 'hidden';
    const visibility = openDropDown ? 'visibile' : 'invisibile';
    const opacity = openDropDown ? 'opacity-100' : 'opacity-0';
    const height = openDropDown ? 'h-auto' : '0';
</script>
<div id={id} class={`relative inline-block top-0 bg-transparent border-none ${className || ''}`}>
    <Trigger button={button} icon={icon} trigger={trigger} text={text} openDropDown={openDropDown} setDropDown={setDropDown} />
    <div class={`z-30 transition duration-200 overflow-hidden absolute right-0 shadow-xs ${visibility} ${opacity} ${height} ${display} ${dropClassName || ''}`}>
      <slot/>
    </div>
  </div>