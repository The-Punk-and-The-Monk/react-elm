export default function observeStickySentinelChange(
  container,
  listSentinelHeaderRefs
) {
  const headerIo = observeSentinelHeader(container, listSentinelHeaderRefs);
  const footerIo = observeSentinelFooter(container);
  return [headerIo, footerIo];
}

function observeSentinelHeader(container, listSentinelHeaderRefs) {
  const io = new IntersectionObserver(
    (entries, observer) => {
      // 组件卸载时, 即使在will unmount中调用io.disconnect , 某个地方也还是会触发回调函数引起错误
      try {
        // console.log(entries, observer);
        for (let entry of entries) {
          const sentinelTop = entry.boundingClientRect.top;
          const sentinelBottom = entry.boundingClientRect.bottom;
          const rootTop = entry.rootBounds.top;
          const rootBottom = entry.rootBounds.bottom;

          if (sentinelTop < rootTop && sentinelBottom > rootTop) {
            console.log("header fire");
            const stickyHeader = entry.target.parentElement.querySelector(
              ".sticky-header"
            );
            fireEvent(true, stickyHeader);
          }
        }
      } catch (err) {}
    },
    {
      threshold: [1],
    }
  );
  const stickyHeaders = addStickySentinel(container, "sticky-sentinel-header");
  stickyHeaders.forEach((node) => {
    listSentinelHeaderRefs.push(node);
    io.observe(node);
  });
  return io;
}

function observeSentinelFooter(container) {
  const io = new IntersectionObserver(
    (entries, observer) => {
      try {
        for (let entry of entries) {
          const sentinelTop = entry.boundingClientRect.top;
          const sentinelBottom = entry.boundingClientRect.bottom;
          const rootTop = entry.rootBounds.top;
          const rootBottom = entry.rootBounds.bottom;
          const sentinelHeight = sentinelBottom - sentinelTop;
          const rootHeight = rootBottom - rootTop;
          if (
            sentinelTop > rootTop &&
            Math.abs(sentinelTop - rootTop) < rootHeight / 4
          ) {
            console.log("footer fire");
            const stickyHeader = entry.target.parentElement.querySelector(
              ".sticky-header"
            );
            fireEvent(true, stickyHeader);
          }
        }
      } catch (err) {}
    },
    {
      threshold: [1],
    }
  );
  const stickyFooters = addStickySentinel(container, "sticky-sentinel-footer");
  stickyFooters.forEach((node) => io.observe(node));
  return io;
}

function addStickySentinel(container, className) {
  return Array.from(container.querySelectorAll(".sticky-section")).map(
    (section) => {
      const stickySentinel = document.createElement("div");
      stickySentinel.classList.add(className);
      section.appendChild(stickySentinel);
      return stickySentinel;
    }
  );
}

function fireEvent(sticky, target) {
  const e = new CustomEvent("sticky-event", {
    detail: {
      sticky,
      target,
    },
  });
  document.dispatchEvent(e);
}
