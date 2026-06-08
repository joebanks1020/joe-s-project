// PotroPlay — Tweaks
const { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect } = window;

const PP_DEFAULTS = /*EDITMODE-BEGIN*/{
  "tema": "marinho",
  "acento": "ouro",
  "hero": "dispositivo",
  "cantos": "suave",
  "titulos": "anton"
}/*EDITMODE-END*/;

function applyTweaks(t) {
  const r = document.documentElement;
  r.setAttribute('data-theme', t.tema);
  r.setAttribute('data-accent', t.acento);
  r.setAttribute('data-hero', t.hero);
  r.setAttribute('data-radius', t.cantos);
  r.setAttribute('data-display', t.titulos);
}

function PPTweaks() {
  const [t, setTweak] = useTweaks(PP_DEFAULTS);
  React.useEffect(() => { applyTweaks(t); }, [t]);
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Estilo" />
      <TweakSelect
        label="Tema de cor"
        value={t.tema}
        options={[
          { value: 'marinho', label: 'Azul-marinho' },
          { value: 'estadio', label: 'Estádio (ouro forte)' },
          { value: 'neon', label: 'Azul vibrante' },
        ]}
        onChange={(v) => setTweak('tema', v)}
      />
      <TweakRadio
        label="Cor de destaque"
        value={t.acento}
        options={[{ value: 'ouro', label: 'Ouro' }, { value: 'verde', label: 'Verde' }]}
        onChange={(v) => setTweak('acento', v)}
      />
      <TweakSection label="Layout" />
      <TweakRadio
        label="Topo (hero)"
        value={t.hero}
        options={[{ value: 'dispositivo', label: 'Com TV' }, { value: 'centralizado', label: 'Centralizado' }]}
        onChange={(v) => setTweak('hero', v)}
      />
      <TweakRadio
        label="Cantos"
        value={t.cantos}
        options={[{ value: 'reto', label: 'Reto' }, { value: 'suave', label: 'Suave' }, { value: 'arredondado', label: 'Redondo' }]}
        onChange={(v) => setTweak('cantos', v)}
      />
      <TweakSection label="Tipografia" />
      <TweakRadio
        label="Títulos"
        value={t.titulos}
        options={[{ value: 'anton', label: 'Anton (impacto)' }, { value: 'archivo', label: 'Archivo (clean)' }]}
        onChange={(v) => setTweak('titulos', v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<PPTweaks />);
