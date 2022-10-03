cargo build --release

ssh "$MFRO_DEPLOY_HOST" killall "sync-server"
sleep 1

scp "target/release/sync-server" "$MFRO_DEPLOY_HOST:server/sync-server/"
ssh "$MFRO_DEPLOY_HOST" "startup/sync-server.sh"
