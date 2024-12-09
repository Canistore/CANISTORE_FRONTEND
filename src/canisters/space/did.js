export const idlFactory = ({ IDL }) => {
  const Environment = IDL.Variant({
    Production: IDL.Null,
    Test: IDL.Null
  })
  const SpaceUpgradeArgs = IDL.Record({
    env: IDL.Opt(Environment),
    status: IDL.Opt(IDL.Nat8),
    max_oss_data_size: IDL.Opt(IDL.Nat),
    enable_search_index: IDL.Opt(IDL.Bool),
    max_albums: IDL.Opt(IDL.Nat32),
    max_tracks: IDL.Opt(IDL.Nat32),
    max_custom_data_size: IDL.Opt(IDL.Nat16),
    dao_canister: IDL.Opt(IDL.Principal),
    visibility: IDL.Opt(IDL.Nat8)
  })
  const SpaceInitArgs = IDL.Record({
    env: Environment,
    status: IDL.Nat8,
    max_oss_data_size: IDL.Nat,
    owner: IDL.Principal,
    enable_search_index: IDL.Bool,
    max_albums: IDL.Nat32,
    name: IDL.Text,
    max_tracks: IDL.Nat32,
    max_custom_data_size: IDL.Nat16,
    dao_canister: IDL.Principal,
    visibility: IDL.Nat8
  })
  const CanisterArgs = IDL.Variant({
    Upgrade: SpaceUpgradeArgs,
    Init: SpaceInitArgs
  })
  const Result = IDL.Variant({ Ok: IDL.Text, Err: IDL.Text })
  const Result_1 = IDL.Variant({ Ok: IDL.Null, Err: IDL.Text })
  const Attribute = IDL.Record({ key: IDL.Text, value: IDL.Text })
  const Result_2 = IDL.Variant({ Ok: IDL.Bool, Err: IDL.Text })
  const Result_3 = IDL.Variant({ Ok: IDL.Nat64, Err: IDL.Text })
  const Tokens = IDL.Record({ e8s: IDL.Nat64 })
  const Result_4 = IDL.Variant({ Ok: Tokens, Err: IDL.Text })
  const StatusRequest = IDL.Record({
    memory_size: IDL.Bool,
    cycles: IDL.Bool,
    heap_memory_size: IDL.Bool
  })
  const StatusResponse = IDL.Record({
    memory_size: IDL.Opt(IDL.Nat64),
    cycles: IDL.Opt(IDL.Nat64),
    heap_memory_size: IDL.Opt(IDL.Nat64)
  })
  const Timestamp = IDL.Record({ timestamp_nanos: IDL.Nat64 })
  const TransferArgs = IDL.Record({
    to: IDL.Vec(IDL.Nat8),
    fee: Tokens,
    memo: IDL.Nat64,
    from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(Timestamp),
    amount: Tokens
  })
  const MusicCategory = IDL.Variant({
    Emo: IDL.Null,
    Ska: IDL.Null,
    SoulMusic: IDL.Null,
    Britpop: IDL.Null,
    CountryMusic: IDL.Null,
    PopularMusic: IDL.Null,
    Singing: IDL.Null,
    EasyListening: IDL.Null,
    MusicOfLatinAmerica: IDL.Null,
    ElectronicDanceMusic: IDL.Null,
    HeavyMetal: IDL.Null,
    Funk: IDL.Null,
    Jazz: IDL.Null,
    KPop: IDL.Null,
    Reggae: IDL.Null,
    Rock: IDL.Null,
    HardRock: IDL.Null,
    ChristianMusic: IDL.Null,
    SynthPop: IDL.Null,
    ProgressiveRock: IDL.Null,
    Blues: IDL.Null,
    IndieRock: IDL.Null,
    PopMusic: IDL.Null,
    Grunge: IDL.Null,
    HouseMusic: IDL.Null,
    Disco: IDL.Null,
    FolkMusic: IDL.Null,
    WorldMusic: IDL.Null,
    NewAgeMusic: IDL.Null,
    TranceMusic: IDL.Null,
    IndianClassicalMusic: IDL.Null,
    ExperimentalMusic: IDL.Null,
    SwingMusic: IDL.Null,
    Dubstep: IDL.Null,
    ElectronicMusic: IDL.Null,
    Metal: IDL.Null,
    MusicOfAfrica: IDL.Null,
    LatinMusic: IDL.Null,
    PunkRock: IDL.Null,
    DanceMusic: IDL.Null,
    RhythmAndBlues: IDL.Null,
    VocalMusic: IDL.Null,
    ClassicalMusic: IDL.Null,
    Bachata: IDL.Null,
    Other: IDL.Null,
    NewWave: IDL.Null,
    Modernism: IDL.Null,
    HipHopMusic: IDL.Null,
    AlternativeRock: IDL.Null,
    Flamenco: IDL.Null,
    Techno: IDL.Null
  })
  const AlbumType = IDL.Variant({
    EP: IDL.Null,
    Playlist: IDL.Null,
    Channel: IDL.Null,
    Album: IDL.Null,
    Single: IDL.Null
  })
  const SubscriptionType = IDL.Variant({
    Free: IDL.Null,
    Day180: IDL.Null,
    Day360: IDL.Null,
    Day30: IDL.Null,
    Day90: IDL.Null,
    Day1000: IDL.Null,
    Permanent: IDL.Null
  })
  const SubscriptionPrice = IDL.Record({
    price: IDL.Nat64,
    sub_type: SubscriptionType
  })
  const CreateAlbumArg = IDL.Record({
    sub_category: IDL.Opt(MusicCategory),
    external_link: IDL.Text,
    title: IDL.Text,
    cover_image: IDL.Text,
    tags: IDL.Vec(IDL.Text),
    album_type: AlbumType,
    description: IDL.Text,
    subscription_prices: IDL.Vec(SubscriptionPrice),
    is_original: IDL.Bool,
    language: IDL.Text,
    release_at: IDL.Opt(IDL.Nat64),
    category: MusicCategory,
    artist: IDL.Text,
    producer: IDL.Opt(IDL.Principal),
    copyright: IDL.Opt(IDL.Text)
  })
  const TokenPrice = IDL.Record({
    price: IDL.Nat64,
    token_name: IDL.Text
  })
  const AwardPrice = IDL.Record({ aid: IDL.Text })
  const LicensePrice = IDL.Record({
    track_id: IDL.Nat64,
    price: IDL.Nat64,
    token_name: IDL.Text
  })
  const PaymentType = IDL.Variant({
    Price: SubscriptionPrice,
    CreationPrice: TokenPrice,
    Verification: IDL.Bool,
    Award: AwardPrice,
    LicensePrice: LicensePrice
  })
  const PaymentInfo = IDL.Record({
    id: IDL.Nat64,
    token: IDL.Text,
    payment_type: PaymentType,
    recipient: IDL.Vec(IDL.Nat8),
    amount: IDL.Nat64,
    created_time: IDL.Nat64
  })
  const Result_5 = IDL.Variant({
    Ok: IDL.Opt(PaymentInfo),
    Err: IDL.Text
  })
  const MusicCertificateResp = IDL.Record({
    key: IDL.Text,
    music_cert_hex: IDL.Text
  })
  const Result_6 = IDL.Variant({
    Ok: MusicCertificateResp,
    Err: IDL.Text
  })
  const AudioFile = IDL.Record({
    canister_id: IDL.Principal,
    file_id: IDL.Nat32
  })
  const TrackVersion = IDL.Variant({
    Live: IDL.Null,
    Radio: IDL.Null,
    Remix: IDL.Null,
    Orginal: IDL.Null
  })
  const CreateTrackArg = IDL.Record({
    audio_file: AudioFile,
    duration: IDL.Opt(IDL.Nat64),
    file_format: IDL.Text,
    name: IDL.Text,
    file_size: IDL.Nat64,
    collaborators: IDL.Vec(IDL.Text),
    songwriter: IDL.Bool,
    instrumental: IDL.Bool,
    is_explicit_lyrics: IDL.Bool,
    versions: IDL.Opt(TrackVersion),
    is_radio_edition: IDL.Bool
  })
  const AssetType = IDL.Variant({
    RecordingWithVocals: IDL.Null,
    SoundFX: IDL.Null,
    RecordingInstrumental: IDL.Null,
    AudioSample: IDL.Null
  })
  const LicensedMedia = IDL.Variant({
    Exclusive: IDL.Null,
    AllMedia: IDL.Null
  })
  const RightPeriod = IDL.Variant({
    Months12: IDL.Null,
    Perpetuity: IDL.Null,
    Years10: IDL.Null,
    Years3: IDL.Null,
    Years5: IDL.Null
  })
  const ChannelType = IDL.Variant({
    User: IDL.Null,
    Platform: IDL.Null,
    Merchant: IDL.Null,
    Other: IDL.Null
  })
  const LicensedTerritory = IDL.Variant({
    Worldwide: IDL.Null,
    ListedTerritories: IDL.Null
  })
  const UsageRights = IDL.Variant({
    Commercial: IDL.Null,
    NonCommercial: IDL.Null
  })
  const CreateTrackLicenseArg = IDL.Record({
    fee: IDL.Opt(IDL.Nat),
    user_pid: IDL.Principal,
    asset_type: IDL.Vec(AssetType),
    licensed_media: IDL.Vec(LicensedMedia),
    track_id: IDL.Nat64,
    right_period: IDL.Vec(RightPeriod),
    channel: ChannelType,
    licensed_territory: IDL.Vec(LicensedTerritory),
    usage_rights: IDL.Vec(UsageRights)
  })
  const EditAlbumArg = IDL.Record({
    sub_category: IDL.Opt(MusicCategory),
    external_link: IDL.Opt(IDL.Text),
    title: IDL.Opt(IDL.Text),
    cover_image: IDL.Opt(IDL.Text),
    tags: IDL.Opt(IDL.Vec(IDL.Text)),
    album_type: IDL.Opt(AlbumType),
    description: IDL.Opt(IDL.Text),
    subscription_prices: IDL.Opt(IDL.Vec(SubscriptionPrice)),
    is_original: IDL.Opt(IDL.Bool),
    language: IDL.Opt(IDL.Text),
    release_at: IDL.Opt(IDL.Nat64),
    category: IDL.Opt(MusicCategory),
    artist: IDL.Opt(IDL.Text),
    producer: IDL.Opt(IDL.Principal),
    copyright: IDL.Opt(IDL.Text)
  })
  const EditTrackArg = IDL.Record({
    audio_file: IDL.Opt(AudioFile),
    duration: IDL.Opt(IDL.Nat64),
    file_format: IDL.Opt(IDL.Text),
    name: IDL.Opt(IDL.Text),
    file_size: IDL.Opt(IDL.Nat64),
    collaborators: IDL.Opt(IDL.Vec(IDL.Text)),
    songwriter: IDL.Opt(IDL.Bool),
    instrumental: IDL.Opt(IDL.Bool),
    is_explicit_lyrics: IDL.Opt(IDL.Bool),
    versions: IDL.Opt(TrackVersion),
    is_radio_edition: IDL.Opt(IDL.Bool)
  })
  const AlbumStatus = IDL.Variant({
    Private: IDL.Null,
    Draft: IDL.Null,
    Public: IDL.Null,
    Deleted: IDL.Null,
    Subscription: IDL.Null
  })
  const AlbumStat = IDL.Record({
    total: IDL.Nat32,
    public_count: IDL.Nat32,
    subscription_count: IDL.Nat32,
    draft_count: IDL.Nat32,
    private_count: IDL.Nat32
  })
  const SubscriberInfo = IDL.Record({
    pid: IDL.Principal,
    created: IDL.Nat64,
    expire_time: IDL.Nat64,
    is_black: IDL.Bool,
    sub_type: SubscriptionType
  })
  const Album = IDL.Record({
    id: IDL.Nat64,
    sub_category: IDL.Opt(MusicCategory),
    status: AlbumStatus,
    external_link: IDL.Text,
    title: IDL.Text,
    created: IDL.Nat64,
    toped: IDL.Nat64,
    subscriber_count: IDL.Nat32,
    allow_comments: IDL.Bool,
    track_ids: IDL.Vec(IDL.Nat64),
    cover_image: IDL.Text,
    tags: IDL.Vec(IDL.Text),
    album_stat: AlbumStat,
    album_type: AlbumType,
    description: IDL.Text,
    subscription_prices: IDL.Vec(SubscriptionPrice),
    is_original: IDL.Bool,
    likes: IDL.Nat32,
    language: IDL.Text,
    version: IDL.Nat32,
    subscribers: IDL.Vec(SubscriberInfo),
    updated: IDL.Nat64,
    release_at: IDL.Opt(IDL.Nat64),
    category: MusicCategory,
    artist: IDL.Text,
    comments: IDL.Nat32,
    plays: IDL.Nat64,
    producer: IDL.Principal,
    dislikes: IDL.Nat32,
    copyright: IDL.Opt(IDL.Text),
    memory_usage: IDL.Nat64
  })
  const Result_7 = IDL.Variant({ Ok: Album, Err: IDL.Text })
  const QueryTrackResp = IDL.Record({
    id: IDL.Nat64,
    audio_file: AudioFile,
    album_id: IDL.Opt(IDL.Nat64),
    created: IDL.Nat64,
    duration: IDL.Opt(IDL.Nat64),
    cert_hex: IDL.Opt(IDL.Text),
    cert_key: IDL.Opt(IDL.Text),
    public_at: IDL.Nat64,
    name: IDL.Text,
    has_share_store: IDL.Bool,
    has_share: IDL.Bool,
    collaborators: IDL.Vec(IDL.Text),
    updated: IDL.Nat64,
    songwriter: IDL.Bool,
    artist: IDL.Principal,
    instrumental: IDL.Bool,
    is_explicit_lyrics: IDL.Bool,
    versions: IDL.Opt(TrackVersion),
    is_radio_edition: IDL.Bool,
    has_license: IDL.Bool
  })
  const Result_8 = IDL.Variant({
    Ok: IDL.Vec(QueryTrackResp),
    Err: IDL.Text
  })
  const AlbumListEntry = IDL.Record({
    id: IDL.Nat64,
    sub_category: IDL.Opt(MusicCategory),
    title: IDL.Text,
    created: IDL.Nat64,
    cover_image: IDL.Text,
    description: IDL.Text,
    updated: IDL.Nat64,
    release_at: IDL.Opt(IDL.Nat64),
    category: MusicCategory,
    track_count: IDL.Nat64,
    producer: IDL.Principal
  })
  const Track = IDL.Record({
    id: IDL.Nat64,
    audio_file: AudioFile,
    album_id: IDL.Opt(IDL.Nat64),
    created: IDL.Nat64,
    duration: IDL.Opt(IDL.Nat64),
    cert_hex: IDL.Opt(IDL.Text),
    cert_key: IDL.Opt(IDL.Text),
    file_format: IDL.Text,
    public_at: IDL.Nat64,
    name: IDL.Text,
    file_size: IDL.Nat64,
    collaborators: IDL.Vec(IDL.Text),
    attributes: IDL.Vec(Attribute),
    updated: IDL.Nat64,
    songwriter: IDL.Bool,
    artist: IDL.Principal,
    instrumental: IDL.Bool,
    is_explicit_lyrics: IDL.Bool,
    versions: IDL.Opt(TrackVersion),
    is_radio_edition: IDL.Bool
  })
  const LicenseSource = IDL.Variant({ Track: Track, Album: Album })
  const LicenseKey = IDL.Record({
    album_id: IDL.Opt(IDL.Nat64),
    track_id: IDL.Opt(IDL.Nat64)
  })
  const QueryLicenseResp = IDL.Record({
    id: IDL.Nat64,
    fee: IDL.Opt(IDL.Nat),
    revoke_time: IDL.Opt(IDL.Nat64),
    created: IDL.Nat64,
    asset_type: IDL.Vec(AssetType),
    source: LicenseSource,
    licensed_media: IDL.Vec(LicensedMedia),
    valid_duration: IDL.Opt(IDL.Nat64),
    user: IDL.Principal,
    start_time: IDL.Nat64,
    resource_key: LicenseKey,
    right_period: IDL.Vec(RightPeriod),
    channel: ChannelType,
    licensed_territory: IDL.Vec(LicensedTerritory),
    usage_rights: IDL.Vec(UsageRights)
  })
  const LicenseListEntry = IDL.Record({
    id: IDL.Nat64,
    fee: IDL.Opt(IDL.Nat),
    created: IDL.Nat64,
    user: IDL.Principal,
    start_time: IDL.Nat64,
    resource_key: LicenseKey
  })
  const UserPost = IDL.Record({
    post_id: IDL.Nat64,
    content: IDL.Text,
    created_at: IDL.Nat64
  })
  const SharedTrackListResp = IDL.Record({
    channel_id: IDL.Nat64,
    track: Track,
    created_at: IDL.Nat64,
    track_id: IDL.Nat64
  })
  const Category = IDL.Record({
    id: IDL.Nat32,
    desc: IDL.Text,
    category_type: MusicCategory,
    parent: IDL.Opt(IDL.Nat32)
  })
  const SpaceInfo = IDL.Record({
    env: Environment,
    categories: IDL.Vec(Category),
    status: IDL.Nat8,
    max_oss_data_size: IDL.Nat,
    created: IDL.Nat64,
    store_track_ids: IDL.Vec(IDL.Nat64),
    managers: IDL.Vec(IDL.Principal),
    owner: IDL.Principal,
    desc: IDL.Text,
    max_albums: IDL.Nat32,
    lang: IDL.Text,
    name: IDL.Text,
    cover: IDL.Text,
    max_custom_data_size: IDL.Nat16,
    total_subscribers: IDL.Nat64,
    total_shares: IDL.Nat64,
    total_post: IDL.Nat64,
    total_view: IDL.Nat64,
    total_albums: IDL.Nat64,
    total_tracks: IDL.Nat64,
    total_orders: IDL.Nat64,
    subscribers: IDL.Vec(SubscriberInfo),
    canister: IDL.Principal,
    oss_canister: IDL.Vec(IDL.Principal),
    total_licenses: IDL.Nat64,
    custom_url: IDL.Text,
    max_track_files: IDL.Nat32,
    dao_canister: IDL.Principal,
    followers: IDL.Vec(IDL.Principal),
    sub_prices: IDL.Vec(IDL.Nat64),
    visibility: IDL.Nat8,
    total_income: IDL.Nat64,
    total_shares_album: IDL.Nat64,
    services: IDL.Vec(IDL.Text),
    total_followers: IDL.Nat64,
    avatar: IDL.Text
  })
  const Result_9 = IDL.Variant({ Ok: SpaceInfo, Err: IDL.Text })
  const Result_10 = IDL.Variant({ Ok: Track, Err: IDL.Text })
  const LicenseTrackListEntry = IDL.Record({
    id: IDL.Nat64,
    fee: IDL.Opt(IDL.Nat),
    created: IDL.Nat64,
    track: Track,
    user: IDL.Principal,
    start_time: IDL.Nat64,
    resource_key: LicenseKey
  })
  const QuerySort = IDL.Variant({
    TimeAsc: IDL.Null,
    TimeDesc: IDL.Null
  })
  const QueryCommonReq = IDL.Record({
    page: IDL.Nat64,
    size: IDL.Nat64,
    sort: QuerySort
  })
  const PaymentStatus = IDL.Variant({
    Refunded: IDL.Null,
    Paid: IDL.Null,
    Unpaid: IDL.Null,
    Cancelled: IDL.Null,
    TimedOut: IDL.Null,
    Verifying: IDL.Null
  })
  const QueryOrder = IDL.Record({
    id: IDL.Nat64,
    status: PaymentStatus,
    token: IDL.Text,
    payment_type: PaymentType,
    source: IDL.Text,
    verified_time: IDL.Opt(IDL.Nat64),
    recipient: IDL.Vec(IDL.Nat8),
    amount_paid: IDL.Nat64,
    payer: IDL.Principal,
    shared_time: IDL.Opt(IDL.Nat64),
    amount: IDL.Nat64,
    created_time: IDL.Nat64
  })
  const QueryOrderResp = IDL.Record({
    total: IDL.Nat64,
    data: IDL.Vec(QueryOrder),
    page: IDL.Nat64,
    has_more: IDL.Bool
  })
  const CanisterDeploy = IDL.Record({
    deploy_at: IDL.Nat64,
    canister: IDL.Principal,
    wasm_hash: IDL.Vec(IDL.Nat8),
    wasm_name: IDL.Text
  })
  const DaoStateInfo = IDL.Record({
    is_open: IDL.Bool,
    name: IDL.Text,
    platform_canister_id: IDL.Principal,
    user_canister_id: IDL.Principal,
    sub_canisters: IDL.Vec(CanisterDeploy)
  })
  const Result_11 = IDL.Variant({ Ok: DaoStateInfo, Err: IDL.Text })
  const Result_12 = IDL.Variant({ Ok: IDL.Principal, Err: IDL.Text })
  const WalletReceiveResult = IDL.Record({ accepted: IDL.Nat64 })
  return IDL.Service({
    __get_candid_interface_tmp_hack: IDL.Func([], [IDL.Text], ['query']),
    add_contract_services: IDL.Func([IDL.Text], [Result], []),
    add_managers: IDL.Func([IDL.Vec(IDL.Principal)], [Result_1], []),
    add_track_attribute: IDL.Func([IDL.Nat64, Attribute], [Result_2], []),
    add_track_ids_to_album: IDL.Func([IDL.Nat64, IDL.Vec(IDL.Nat64)], [Result_1], []),
    add_track_license_for_platform: IDL.Func([IDL.Nat64], [Result_3], []),
    api_version: IDL.Func([], [IDL.Nat16], ['query']),
    canister_account: IDL.Func([], [IDL.Vec(IDL.Nat8)], ['query']),
    canister_balance: IDL.Func([], [Result_4], []),
    canister_get_status: IDL.Func([StatusRequest], [StatusResponse], ['query']),
    canister_transfer: IDL.Func([TransferArgs], [Result_2], []),
    confirm_award_order: IDL.Func([IDL.Nat64], [Result_2], []),
    confirm_license_order: IDL.Func([IDL.Nat64], [Result_3], []),
    create_album: IDL.Func([CreateAlbumArg], [Result_3], []),
    create_award_order: IDL.Func([IDL.Text, IDL.Text, IDL.Nat64, PaymentType], [Result_5], []),
    create_license_order: IDL.Func([IDL.Nat64, IDL.Text], [Result_5], []),
    create_music_certificate: IDL.Func([IDL.Nat64], [Result_6], []),
    create_post: IDL.Func([IDL.Text], [Result], []),
    create_track: IDL.Func([CreateTrackArg], [Result_3], []),
    create_track_license: IDL.Func([CreateTrackLicenseArg], [Result_3], []),
    delete_album: IDL.Func([IDL.Nat64], [Result], []),
    delete_post: IDL.Func([IDL.Nat64], [Result_1], []),
    delete_track: IDL.Func([IDL.Nat64], [Result_1], []),
    delete_track_license: IDL.Func([IDL.Nat64], [Result_3], []),
    edit_album: IDL.Func([IDL.Nat64, EditAlbumArg], [Result_1], []),
    edit_track: IDL.Func([IDL.Nat64, EditTrackArg], [Result_1], []),
    get_album_info: IDL.Func([IDL.Nat64], [Result_7], ['query']),
    get_album_tracks_list: IDL.Func([IDL.Nat64], [Result_8], ['query']),
    get_albums_list: IDL.Func([IDL.Nat64, IDL.Nat64], [IDL.Vec(AlbumListEntry)], ['query']),
    get_license_by_track: IDL.Func(
      [IDL.Nat64, IDL.Principal],
      [IDL.Opt(QueryLicenseResp)],
      ['query']
    ),
    get_license_list: IDL.Func([IDL.Nat64, IDL.Nat64], [IDL.Vec(LicenseListEntry)], ['query']),
    get_post_list: IDL.Func([IDL.Nat64, IDL.Nat64], [IDL.Vec(UserPost)], ['query']),
    get_public_track_ids: IDL.Func([], [IDL.Vec(IDL.Nat64)], ['query']),
    get_share_list: IDL.Func([IDL.Nat64, IDL.Nat64], [IDL.Vec(SharedTrackListResp)], ['query']),
    get_share_store_list: IDL.Func([IDL.Nat64, IDL.Nat64], [IDL.Vec(Track)], ['query']),
    get_share_store_track_ids: IDL.Func([IDL.Vec(IDL.Nat64)], [IDL.Vec(Track)], ['query']),
    get_space_info: IDL.Func([], [Result_9], ['query']),
    get_total_tracks: IDL.Func([], [IDL.Nat64], ['query']),
    get_track_info: IDL.Func([IDL.Nat64], [Result_10], ['query']),
    get_track_license_list: IDL.Func(
      [IDL.Nat64, IDL.Nat64],
      [IDL.Vec(LicenseTrackListEntry)],
      ['query']
    ),
    query_orders: IDL.Func([QueryCommonReq], [QueryOrderResp], ['query']),
    refund_payment_order: IDL.Func([IDL.Nat64, IDL.Vec(IDL.Nat8)], [Result_2], []),
    remote_batch_share_track_to_platform: IDL.Func(
      [
        IDL.Vec(IDL.Nat64),
        IDL.Opt(IDL.Nat64),
        IDL.Opt(IDL.Vec(IDL.Text)),
        IDL.Opt(IDL.Vec(IDL.Text)),
        IDL.Opt(IDL.Vec(IDL.Vec(Attribute)))
      ],
      [Result_1],
      []
    ),
    remote_delete_share_track_to_platform: IDL.Func([IDL.Nat64], [Result_1], []),
    remote_get_dao_info: IDL.Func([], [Result_11], []),
    remote_send_post_message: IDL.Func([], [Result], []),
    remote_share_track_to_platform: IDL.Func(
      [
        IDL.Nat64,
        IDL.Opt(IDL.Nat64),
        IDL.Opt(IDL.Text),
        IDL.Opt(IDL.Text),
        IDL.Opt(IDL.Vec(Attribute))
      ],
      [Result_1],
      []
    ),
    remove_contract_services: IDL.Func([IDL.Text], [Result], []),
    remove_track_ids_to_album: IDL.Func([IDL.Nat64, IDL.Vec(IDL.Nat64)], [Result_1], []),
    remove_track_license_for_platform: IDL.Func([IDL.Nat64], [Result_1], []),
    update_dao_canister: IDL.Func([IDL.Principal], [Result_12], []),
    wallet_balance: IDL.Func([], [IDL.Nat], ['query']),
    wallet_receive: IDL.Func([], [WalletReceiveResult], [])
  })
}
export const init = ({ IDL }) => {
  const Environment = IDL.Variant({
    Production: IDL.Null,
    Test: IDL.Null
  })
  const SpaceUpgradeArgs = IDL.Record({
    env: IDL.Opt(Environment),
    status: IDL.Opt(IDL.Nat8),
    max_oss_data_size: IDL.Opt(IDL.Nat),
    enable_search_index: IDL.Opt(IDL.Bool),
    max_albums: IDL.Opt(IDL.Nat32),
    max_tracks: IDL.Opt(IDL.Nat32),
    max_custom_data_size: IDL.Opt(IDL.Nat16),
    dao_canister: IDL.Opt(IDL.Principal),
    visibility: IDL.Opt(IDL.Nat8)
  })
  const SpaceInitArgs = IDL.Record({
    env: Environment,
    status: IDL.Nat8,
    max_oss_data_size: IDL.Nat,
    owner: IDL.Principal,
    enable_search_index: IDL.Bool,
    max_albums: IDL.Nat32,
    name: IDL.Text,
    max_tracks: IDL.Nat32,
    max_custom_data_size: IDL.Nat16,
    dao_canister: IDL.Principal,
    visibility: IDL.Nat8
  })
  const CanisterArgs = IDL.Variant({
    Upgrade: SpaceUpgradeArgs,
    Init: SpaceInitArgs
  })
  return [IDL.Opt(CanisterArgs)]
}
