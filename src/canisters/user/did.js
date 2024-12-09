export const idlFactory = ({ IDL }) => {
  const Environment = IDL.Variant({
    Production: IDL.Null,
    Test: IDL.Null
  })
  const StateUpgradeArgs = IDL.Record({
    env: IDL.Opt(Environment),
    indexer_canister_id: IDL.Opt(IDL.Principal),
    owner: IDL.Opt(IDL.Principal),
    name: IDL.Opt(IDL.Text),
    dao_canister_id: IDL.Opt(IDL.Principal)
  })
  const StateInitArgs = IDL.Record({
    env: Environment,
    indexer_canister_id: IDL.Opt(IDL.Principal),
    owner: IDL.Principal,
    name: IDL.Text,
    dao_canister_id: IDL.Principal
  })
  const CanisterArgs = IDL.Variant({
    Upgrade: StateUpgradeArgs,
    Init: StateInitArgs
  })
  const Result = IDL.Variant({ Ok: IDL.Text, Err: IDL.Text })
  const Attribute = IDL.Record({ key: IDL.Text, value: IDL.Text })
  const Result_1 = IDL.Variant({ Ok: IDL.Bool, Err: IDL.Text })
  const UserSpaceInfo = IDL.Record({
    oss_id: IDL.Vec(IDL.Principal),
    space_id: IDL.Principal
  })
  const NFT = IDL.Record({
    token_index: IDL.Text,
    canister_id: IDL.Principal,
    standard: IDL.Text
  })
  const MusicContentType = IDL.Variant({
    DJ: IDL.Null,
    MusicProducer: IDL.Null,
    Band: IDL.Null,
    MasteringEngineer: IDL.Null,
    GroupPerformer: IDL.Null,
    Songwriter: IDL.Null,
    StudioEngineer: IDL.Null,
    MusicComposer: IDL.Null,
    OrchestraMusician: IDL.Null,
    SessionMusician: IDL.Null,
    RecordingMixingEngineer: IDL.Null,
    Singer: IDL.Null
  })
  const UserInfo = IDL.Record({
    bio: IDL.Text,
    nft: IDL.Opt(NFT),
    pid: IDL.Principal,
    updated_at: IDL.Nat64,
    created: IDL.Nat64,
    born: IDL.Opt(IDL.Nat64),
    handler: IDL.Text,
    email: IDL.Text,
    website: IDL.Text,
    trusted_ecdsa_pub_key: IDL.Opt(IDL.Vec(IDL.Nat8)),
    artist_name: IDL.Text,
    genre: IDL.Text,
    spaces: IDL.Vec(UserSpaceInfo),
    trusted_eddsa_pub_key: IDL.Opt(IDL.Vec(IDL.Nat8)),
    music_content_type: IDL.Opt(MusicContentType),
    location: IDL.Text,
    avatar: IDL.Text,
    confirm_agreement: IDL.Bool
  })
  const Result_2 = IDL.Variant({ Ok: UserInfo, Err: IDL.Text })
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
  const Result_3 = IDL.Variant({
    Ok: IDL.Opt(PaymentInfo),
    Err: IDL.Text
  })
  const Result_4 = IDL.Variant({ Ok: IDL.Principal, Err: IDL.Text })
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
  const UpdateUserInfo = IDL.Record({
    bio: IDL.Opt(IDL.Text),
    born: IDL.Opt(IDL.Nat64),
    handler: IDL.Opt(IDL.Text),
    website: IDL.Opt(IDL.Text),
    artist_name: IDL.Opt(IDL.Text),
    genre: IDL.Opt(IDL.Text),
    music_content_type: IDL.Opt(MusicContentType),
    location: IDL.Opt(IDL.Text),
    avatar: IDL.Opt(IDL.Text),
    confirm_agreement: IDL.Opt(IDL.Bool)
  })
  const WalletReceiveResult = IDL.Record({ accepted: IDL.Nat64 })
  return IDL.Service({
    __get_candid_interface_tmp_hack: IDL.Func([], [IDL.Text], ['query']),
    add_invite_code: IDL.Func([IDL.Text], [Result], []),
    add_user_attribute: IDL.Func([Attribute], [Result_1], []),
    add_user_space_info: IDL.Func([IDL.Principal, UserSpaceInfo], [Result_1], []),
    admin_login: IDL.Func([IDL.Principal], [Result_2], []),
    canister_account: IDL.Func([], [IDL.Text, IDL.Vec(IDL.Nat8)], ['query']),
    canister_get_status: IDL.Func([StatusRequest], [StatusResponse], ['query']),
    confirm_payment_order: IDL.Func([IDL.Nat64], [Result_1], []),
    create_payment_order: IDL.Func([IDL.Text], [Result_3], []),
    create_user_space_by_invite_code: IDL.Func([IDL.Text], [Result_4], []),
    create_user_space_by_payment: IDL.Func([IDL.Nat64], [Result_4], []),
    get_avatar: IDL.Func([IDL.Opt(IDL.Principal)], [IDL.Text], ['query']),
    get_email: IDL.Func([IDL.Opt(IDL.Principal)], [IDL.Text], ['query']),
    get_invite_codes: IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    get_user_count: IDL.Func([], [IDL.Nat64], ['query']),
    get_user_info: IDL.Func([IDL.Principal], [IDL.Opt(UserInfo)], ['query']),
    get_user_infos: IDL.Func([IDL.Vec(IDL.Principal)], [IDL.Vec(UserInfo)], ['query']),
    get_user_infos_by_space_ids: IDL.Func([IDL.Vec(IDL.Principal)], [IDL.Vec(UserInfo)], ['query']),
    get_user_pids: IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    get_user_spaces: IDL.Func([IDL.Opt(IDL.Principal)], [IDL.Vec(UserSpaceInfo)], ['query']),
    profile: IDL.Func([], [IDL.Opt(UserInfo)], ['query']),
    query_orders: IDL.Func([QueryCommonReq], [QueryOrderResp], ['query']),
    refund_payment_order: IDL.Func([IDL.Nat64, IDL.Vec(IDL.Nat8)], [Result_1], []),
    set_avatar: IDL.Func([IDL.Text], [Result_1], []),
    set_email: IDL.Func([IDL.Text], [Result_1], []),
    set_public_key: IDL.Func(
      [IDL.Opt(IDL.Vec(IDL.Nat8)), IDL.Opt(IDL.Vec(IDL.Nat8))],
      [Result_1],
      []
    ),
    set_user_info: IDL.Func([UpdateUserInfo], [Result_1], []),
    update_dao_canister: IDL.Func([IDL.Principal], [Result_4], []),
    user_login: IDL.Func([], [Result_2], []),
    wallet_balance: IDL.Func([], [IDL.Nat], ['query']),
    wallet_receive: IDL.Func([], [WalletReceiveResult], [])
  })
}
export const init = ({ IDL }) => {
  const Environment = IDL.Variant({
    Production: IDL.Null,
    Test: IDL.Null
  })
  const StateUpgradeArgs = IDL.Record({
    env: IDL.Opt(Environment),
    indexer_canister_id: IDL.Opt(IDL.Principal),
    owner: IDL.Opt(IDL.Principal),
    name: IDL.Opt(IDL.Text),
    dao_canister_id: IDL.Opt(IDL.Principal)
  })
  const StateInitArgs = IDL.Record({
    env: Environment,
    indexer_canister_id: IDL.Opt(IDL.Principal),
    owner: IDL.Principal,
    name: IDL.Text,
    dao_canister_id: IDL.Principal
  })
  const CanisterArgs = IDL.Variant({
    Upgrade: StateUpgradeArgs,
    Init: StateInitArgs
  })
  return [IDL.Opt(CanisterArgs)]
}
