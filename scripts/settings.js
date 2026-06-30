function updateSerpuloDocking(isEnabled) {
    const serpuloCoreUnits = [
        UnitTypes.alpha,
        UnitTypes.beta,
        UnitTypes.gamma
    ];

    serpuloCoreUnits.forEach(unit => {
        if (unit != null) {
            unit.coreUnitDock = isEnabled;
        }
    });
    
    Log.info("Serpulo core unit docking set to: " + isEnabled);
}

//only bcs the unit spawning at core pmo me sometimes
Events.on(ClientLoadEvent, () => {
    const myMod = Vars.mods.getMod("simple-expansion");
    const modIconTexture = myMod.iconTexture;
    const modIconRegion = new TextureRegion(modIconTexture);
    const modIconDrawable = new TextureRegionDrawable(modIconRegion);

    const serpDocking = "@setting.serpulo-core-unit-dock.name";

    Vars.ui.settings.addCategory("@setting.simple-expansion-settings.name", modIconDrawable, table => {
        table.check(serpDocking, Core.settings.get(serpDocking, false), value => {
            Core.settings.put(serpDocking, value);
            updateSerpuloDocking(value);
        }).left().padBottom(4);
        table.row();        
    });
    const savedSetting = Core.settings.get(serpDocking, false);
    updateSerpuloDocking(savedSetting);
});
