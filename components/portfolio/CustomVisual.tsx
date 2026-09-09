import Image from 'next/image';

type Visual = {
  readonly id: string;
  readonly backgroundWord: string;
  readonly mark: string;
  readonly caption: string;
  readonly asset: string;
};

export function CustomVisual({ visual, index }: { visual: Visual; index: number }) {
  return (
    <section
      className={`scene visual-break visual-break-${index + 1}`}
      id={`visual-${index + 1}`}
      aria-label={`Visual interlude ${index + 1}: ${visual.caption}`}
      data-visual-scene
    >
      <div className="visual-composition" data-visual-composition>
        <p className="visual-background-word" aria-hidden="true">{visual.backgroundWord}</p>
        <div className="visual-core">
          {visual.asset ? (
            <Image
              className="visual-asset"
              src={visual.asset}
              alt={visual.caption}
              width={920}
              height={680}
              sizes="(max-width: 700px) 84vw, 58vw"
            />
          ) : (
            <div className="visual-placeholder" aria-hidden="true">
              <span className="visual-index">0{index + 1}</span>
              <span className="visual-mark">{visual.mark}</span>
              <span className="visual-orbit" />
            </div>
          )}
        </div>
        <p className="visual-caption">{visual.caption}</p>
      </div>
    </section>
  );
}
