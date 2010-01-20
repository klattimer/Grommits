function GrommitInit(bundle_id) {
    window.widget = new GrommitWidget(bundle_id, false);
    window.TimeZoneInfo = new TZ();
    window.widget.setSharePath();
    window.widget.setCloseBoxOffset();
}
