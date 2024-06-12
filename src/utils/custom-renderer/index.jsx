import { useEffect, useMemo, useRef } from "react";
import invariant from "tiny-invariant";
import { usePageContext } from "react-pdf";

// https://github.com/wojtekmaj/react-pdf/discussions/1619
export default function CustomRenderer() {
  const pageContext = usePageContext();

  invariant(pageContext, "Unable to find Page context.");

  const { _className, page, rotate, scale } = pageContext;

  invariant(
    page,
    "Attempted to render page canvas, but no page was specified."
  );

  const imageElement = useRef < HTMLImageElement > null;

  const viewport = useMemo(
    () => page.getViewport({ scale, rotation: rotate }),
    [page, rotate, scale]
  );

  function drawPageOnImage() {
    if (!page) {
      return;
    }

    const { current: image } = imageElement;

    if (!image) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: canvas.getContext("2d", { alpha: false }),
      viewport,
    };

    const cancellable = page.render(renderContext);
    const runningTask = cancellable;

    cancellable.promise
      .then(() => {
        image.src = canvas.toDataURL();
      })
      .catch(() => {
        // Intentionally empty
      });

    return () => {
      runningTask.cancel();
    };
  }

  useEffect(drawPageOnImage, [imageElement, page, viewport]);

  console.log(imageElement);

  return (
    <img
      className={`${_className}__image`}
      height={viewport.height}
      // ref={imageElement}
      width={viewport.width}
    />
  );
}
