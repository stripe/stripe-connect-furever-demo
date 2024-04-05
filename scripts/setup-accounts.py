#!/usr/bin/env python

import logging
import itertools
import math
import os
import random
import time

from dotenv import dotenv_values
import stripe

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONNECTED_ACCOUNT_COUNT = 84

file_handler = logging.StreamHandler()
file_handler.addFilter(logging.Filter(name=__name__))
file_handler.setLevel(logging.INFO)

stripe_handler = logging.StreamHandler()
stripe_handler.addFilter(logging.Filter(name="stripe"))
stripe_handler.setLevel(logging.ERROR)

logging.basicConfig(
    level=logging.INFO,
    format="[%(levelname)s] %(message)s",
    handlers=[file_handler, stripe_handler],
)

log = logging.getLogger(__name__)

EMAIL_DOMAIN = "yubasoft.net"

FIRST_NAMES = [
    "David",
    "Elizabeth",
    "Emily",
    "James",
    "Jennifer",
    "Jenny",
    "Jessica",
    "John",
    "Joseph",
    "Mary",
    "Michael",
    "Rebecca",
    "Robert",
    "Sarah",
    "Thomas",
    "William",
]
LAST_NAMES = [
    "Anderson",
    "Brown",
    "Davis",
    "Harris",
    "Jackson",
    "Johnson",
    "Jones",
    "Miller",
    "Moore",
    "Rosen",
    "Smith",
    "Taylor",
    "Thomas",
    "White",
    "Williams",
    "Wilson",
]

NAMES = itertools.product(
    random.sample(FIRST_NAMES, k=len(FIRST_NAMES)),
    random.sample(LAST_NAMES, k=len(LAST_NAMES)),
)

YOGA_STUDIO_NAMES = [
    "Air Yoga",
    "Alive and Shine Yoga",
    "Anahata Yoga Studio",
    "Ananda Yoga Studio",
    "Asana Soul Yoga",
    "Ashtanga Yoga Center",
    "Aviva Yoga",
    "Bella Prana Yoga Studio",
    "Bikram Hot Yoga",
    "Bliss Body Yoga",
    "Blissful Yoga",
    "Breath & Flow Yoga",
    "Breathe Yoga Studio",
    "Breathworks Yoga",
    "Center of Light Yoga",
    "City Yoga",
    "Core Yoga",
    "CorePower Yoga",
    "Dancing Crane Yoga",
    "Dancing Light Yoga",
    "Divine Light Yoga",
    "Downtown Yoga",
    "Downward Dog Yoga",
    "Earth Yoga Village",
    "Easy Breezy Yoga",
    "Enlighten Yoga",
    "Evolation Yoga",
    "Flow Yoga",
    "Fluid Yoga",
    "Forrest Yoga Circle",
    "Free Spirit Yoga",
    "Gaiam Yoga Studio",
    "Garland Yoga",
    "Glow Yoga & Wellness",
    "Golden Light Yoga",
    "Green Monkey Yoga",
    "Growing Lotus Yoga",
    "Ha Yoga",
    "Hamsa Yoga",
    "Happy Soul Studio",
    "Happy Soul Yoga",
    "Happy Space Yoga",
    "Happy Yoga Place",
    "Harmony Yoga",
    "High Vibe Yoga",
    "Hilltop Yoga Retreat",
    "Himalayan High Yoga",
    "Humble Heart Yoga",
    "Humble Warrior Yoga",
    "Infinite Light Yoga & Wellness",
    "Infinity Balance Yoga",
    "Infinity Yoga Studio",
    "Inhale Yoga Exhale Stress",
    "Inward Bound Yoga",
    "Iyengar Yoga Center",
    "Iyengar Yogaworx",
    "Jai! Yoga",
    "Jivamukti Yoga School",
    "Just Breathe Yoga & Pilates",
    "Kali Natha Yoga School",
    "Kali Yuga Yoga",
    "Karma Yoga Studio",
    "Krishnamacharya Yoga Mandiram",
    "Kundalini Yoga Works",
    "Laughing Lotus Yoga",
    "Levitate Yoga",
    "Liberate Yoga",
    "Life Yoga Studio",
    "LifeForce Yoga",
    "Living Yoga",
    "Lotus Yoga Studio",
    "Magic Carpet Yoga",
    "MahaDevi Yoga",
    "Majestic Yoga",
    "Mandala Yoga",
    "Mudita Yoga",
    "My Vinyasa Practice",
    "Namasté Yoga & Wellness",
    "Nirvana Yoga",
    "Nourish Yoga Studio",
    "Om Yoga Center",
    "One Love Yoga",
    "Open Heart Yoga",
    "Padma Yoga Center",
    "Peace of Mind Yoga",
    "Peace Yoga",
    "Peaceful Spirit Yoga",
    "Pink Lotus Yoga Studio",
    "Power Living Yoga",
    "Power of Now Yoga",
    "Power Yoga Zone",
    "Prana Flow Yoga",
    "Pranamaya Yoga",
    "Puma Yoga",
    "Pure Yoga",
    "Purna Yoga East",
    "Quanta Yoga Flow",
    "Radiate Yoga Studio",
    "Rainbow Yoga Studio",
    "Rhythm Yoga",
    "Rise Yoga Studio",
    "Rocket Yoga",
    "Rooted Yoga",
    "Sacred Seed Yoga",
    "Samadhi Yoga",
    "Satsanga Yoga",
    "Serenity Yoga",
    "Shakti Flow Yoga",
    "ShivaShakti Yoga",
    "Shri Yoga",
    "Sol Yoga",
    "Soul Tree Yoga",
    "Soul Yoga",
    "Source of Light Yoga",
    "Source Yoga",
    "Spark Yoga",
    "Spiral Yoga Shala",
    "Spirit Yoga",
    "Spring Yoga Center",
    "Sunrise Yoga Studio",
    "The Green Studio",
    "The Movement Yoga",
    "The Sadhana Center",
    "The Yoga Chakra",
    "The Yoga Garden",
    "The Yoga Loft",
    "The Yoga Movement",
    "The Yoga Nook",
    "The Yoga Space",
    "Thrive Yoga Space",
    "Tranquil Yoga",
    "Transcend Yoga",
    "Truth Yoga",
    "Tula Yoga",
    "Twist Yoga Studio",
    "Twisted Yoga",
    "Union Yoga Studio",
    "Unity Yoga",
    "Uptown Yoga",
    "Urban Yoga Spa",
    "Vinyasa Flow Yoga",
    "Vyasa Yoga",
    "Willow Street Yoga",
    "Yoga and Zen Center",
    "Yoga Bliss",
    "Yoga Box",
    "Yoga Circle",
    "Yoga Core & More",
    "Yoga Dojo",
    "Yoga Elements Studio",
    "Yoga Flow Studio",
    "Yoga Flow",
    "Yoga for Everybody",
    "Yoga Friendly",
    "Yoga Garden & Juice Bar",
    "Yoga Grid",
    "Yoga Ground",
    "Yoga Hawthorn",
    "Yoga Hive Community",
    "Yoga Hive Studio",
    "Yoga Hive",
    "Yoga House",
    "Yoga Hub",
    "Yoga Hut",
    "Yoga Island",
    "Yoga Jones",
    "Yoga Joy",
    "Yoga Lab",
    "Yoga Light",
    "Yoga Mall",
    "Yoga Mosaic Studio",
    "Yoga Nest",
    "Yoga Oasis",
    "Yoga Om",
    "Yoga Pulse",
    "Yoga Sanctuary",
    "Yoga Six",
    "Yoga Sol Center",
    "Yoga Soul",
    "Yoga Therapy Centre",
    "Yoga Tonic",
    "Yoga Tree Studio",
    "Yoga Universe",
    "Yoga Village",
    "Yoga Well Studio",
    "Yogabar",
    "Yogabarre",
    "Yogafaith",
    "Yogafied Collective",
    "Yogafied",
    "Yogalaya",
    "Yogalife Studio",
    "Yogaloft",
    "Yogalux",
    "Yogamojo",
    "Yogamotion",
    "YogaOne studio",
    "Yogaspace",
    "Yogaspirit",
    "Yogavibes Studio",
    "YogaWorks",
    "Yogi Tree Yoga Studio",
    "Yogic Alchemy",
    "Yogic Bliss",
    "Zen Yoga Co-op",
    "Zen Yoga",
    "Zenko Yoga",
    "Zensa Yoga",
]

EXTERNAL_BUSINESS_NAMES = [
    "Green Peace Yoga Mats",
    "Zen Garden Incense Store",
    "Tranquil Harmony Meditation Cushions",
    "Serenity Sounds Audio Equipment",
    "Enlightened Spaces Interior Design",
    "PureLife Eco Cleaning Supplies",
    "Natural Elements Water Delivery",
    "Wholesome Energies Snack Distributor",
    "Inner Calm Tea Suppliers",
    "Mindful Media Marketing Agency",
    "Sun Salutation Solar Power Solutions",
]

RESTRICTED_TAG = "restricted"
REJECTED_TAG = "rejected"
ELEVATED_FRAUD_TAG = "elevated_fraud"
HIGH_FRAUD_TAG = "high_fraud"
PROTECTED_TAG = "protected"

# For the account we're going to use for the embedded demo
DEMO_ACCOUNT_TAG = "demo_account"
SUPPORT_TICKET_ADDED_TAG = "support_ticket"


# The following are weights for the tags
(
    HIGH_FRAUD_COUNT,
    ELEVATED_FRAUD_COUNT,
    REJECTED_COUNT,
    RESTRICTED_COUNT,
) = (8, 9, 4, 8)
NORMAL_COUNT = 100 - (
    HIGH_FRAUD_COUNT + ELEVATED_FRAUD_COUNT + REJECTED_COUNT + RESTRICTED_COUNT
)


def is_demo_account(account):
    return account.metadata.get(DEMO_ACCOUNT_TAG, False)


def is_protected_account(account):
    return account.metadata.get(PROTECTED_TAG, False)


def is_restricted_account(account):
    return account.metadata.get(RESTRICTED_TAG, False)


def is_rejected_account(account):
    return account.metadata.get(REJECTED_TAG, False)


def is_elevated_fraud_account(account):
    return account.metadata.get(ELEVATED_FRAUD_TAG, False)


def is_high_fraud_account(account):
    return account.metadata.get(HIGH_FRAUD_TAG, False)


def has_support_ticket(account):
    return account.metadata.get(SUPPORT_TICKET_ADDED_TAG, False)


def ensure_accounts():
    """
    Create or update connected accounts to reach the limit
    """
    # Get existing connected accounts
    accounts = list(stripe.Account.list().auto_paging_iter())

    account_ids = [account.id for account in accounts]
    used_studio_names = set([account.business_profile.name for account in accounts])

    log.info(f"Have {len(account_ids)} connected accounts")

    identities = [
        {
            "first_name": first_name,
            "last_name": last_name,
            "email": f"{first_name.lower()}.{last_name.lower()}@{EMAIL_DOMAIN}",
        }
        for first_name, last_name in NAMES
    ]

    studio_names = [
        name
        for name in random.sample(YOGA_STUDIO_NAMES, k=len(YOGA_STUDIO_NAMES))
        if name not in used_studio_names
    ]

    # Create any accounts to reach the limit
    to_create = CONNECTED_ACCOUNT_COUNT - len(account_ids)
    if to_create <= 0:
        return

    log.info(f"Creating {to_create} connected accounts")

    for i in range(CONNECTED_ACCOUNT_COUNT - len(account_ids)):
        identity = identities[i % len(identities)]

        # Pick an unused business name
        business_name = random.choice(studio_names)
        while business_name in used_studio_names:
            business_name = random.choice(studio_names)
        used_studio_names.add(business_name)

        # Select the tag for this account
        tag_weight = random.randint(
            0,
            sum(
                [
                    HIGH_FRAUD_COUNT,
                    ELEVATED_FRAUD_COUNT,
                    REJECTED_COUNT,
                    RESTRICTED_COUNT,
                    NORMAL_COUNT,
                ]
            ),
        )

        identity_mismatch = False
        inaccessible = False

        metadata = {}
        if tag_weight < HIGH_FRAUD_COUNT:
            metadata[HIGH_FRAUD_TAG] = "true"
        elif tag_weight < (HIGH_FRAUD_COUNT + ELEVATED_FRAUD_COUNT):
            metadata[ELEVATED_FRAUD_TAG] = "true"
        elif tag_weight < (HIGH_FRAUD_COUNT + ELEVATED_FRAUD_COUNT + REJECTED_COUNT):
            metadata[REJECTED_TAG] = "true"
        elif tag_weight < (
            HIGH_FRAUD_COUNT + ELEVATED_FRAUD_COUNT + REJECTED_COUNT + RESTRICTED_COUNT
        ):
            metadata[RESTRICTED_TAG] = "true"

            # Pick which kind of restricted we'll use
            if random.randint(0, 100) >= 50:
                identity_mismatch = True
            else:
                inaccessible = True
        else:
            tag = None

        bank_account = stripe.Token.create(
            bank_account={
                "country": "US",
                "currency": "usd",
                "account_holder_name": f"{identity['first_name']} {identity['last_name']}",
                "account_holder_type": "individual",
                "routing_number": "110000000",
                "account_number": "000123456789",
            },
        )

        # Create an account
        account = stripe.Account.create(
            controller={
                "losses": {"payments": "application"},
                "fees": {"payer": "application"},
                "requirement_collection": "application",
                "stripe_dashboard": {"type": "none"},
            },
            country="US",
            email=identity["email"],
            capabilities={
                "card_payments": {"requested": True},
                "transfers": {"requested": True},
                "card_issuing": {"requested": True},
                "treasury": {"requested": True},
            },
            external_account=bank_account.id,
            business_profile={
                "name": business_name,
                "mcc": "7299",
                "url": (
                    "https://inaccessible.stripe.com"
                    if inaccessible
                    else "https://accessible.stripe.com"
                ),
                "product_description": "Yoga studio",
                "support_address": {
                    "line1": "354 Oyster Point Blvd",
                    "city": "South San Francisco",
                    "state": "CA",
                    "postal_code": "94080",
                },
                "support_email": identity["email"],
                "support_phone": "8888675309",
                "support_url": "https://pose.dev",
                "estimated_worker_count": 10,
                "annual_revenue": {
                    "amount": 10000_00,
                    "currency": "usd",
                    "fiscal_year_end": "2023-12-31",
                },
            },
            business_type="individual",
            company={
                "tax_id": "111111111" if identity_mismatch else "222222222",
            },
            individual={
                "address": {
                    "line1": "address_full_match",
                    "city": "South San Francisco",
                    "country": "US",
                    "state": "CA",
                    "postal_code": "94080",
                },
                "dob": {
                    "day": 1,
                    "month": 1,
                    "year": 1901,
                },
                "email": identity["email"],
                "first_name": identity["first_name"],
                "last_name": identity["last_name"],
                "id_number": "111111111" if identity_mismatch else "222222222",
                "ssn_last_4": "1111" if identity_mismatch else "2222",
                "phone": "8888675309",
            },
            metadata=metadata,
            settings={
                "card_issuing": {
                    "tos_acceptance": {
                        "date": int(time.time()),
                        "ip": "108.36.155.218",
                    }
                },
                "treasury": {
                    "tos_acceptance": {
                        "date": int(time.time()),
                        "ip": "108.36.155.218",
                    }
                },
            },
            tos_acceptance={
                "date": int(time.time()),
                "ip": "108.36.155.218",
            },
        )


def resolve_requirements(account):
    assert isinstance(account, stripe.Account)

    if not account.requirements.past_due or is_restricted_account(account):
        # Nothing due, or we're expecting it to be restricted
        return

    log.info(f"Resolving requirements for {account.id}")

    if "settings.card_issuing.tos_acceptance.date" in account.requirements.past_due:
        log.info(f"Accepting card issuing TOS for {account.id}")
        stripe.Account.modify(
            account.id,
            settings={
                "card_issuing": {
                    "tos_acceptance": {
                        "date": int(time.time()),
                        "ip": "108.36.155.218",
                    }
                }
            },
        )

    if "settings.treasury.tos_acceptance.date" in account.requirements.past_due:
        log.info(f"Accepting treasury TOS for {account.id}")
        stripe.Account.modify(
            account.id,
            settings={
                "treasury": {
                    "tos_acceptance": {
                        "date": int(time.time()),
                        "ip": "108.36.155.218",
                    }
                }
            },
        )


def ensure_financial_account(account):
    """
    Ensure each account has a financial account
    """
    assert isinstance(account, stripe.Account)

    financial_accounts = stripe.treasury.FinancialAccount.list(
        stripe_account=account.id
    )
    if financial_accounts:
        return

    log.info(f"Creating financial account for {account.id}")

    # Create a financial account
    stripe.treasury.FinancialAccount.create(
        supported_currencies=["usd"],
        features={
            "card_issuing": {"requested": True},
            "deposit_insurance": {"requested": True},
            "financial_addresses": {"aba": {"requested": True}},
            "inbound_transfers": {"ach": {"requested": True}},
            "intra_stripe_flows": {"requested": True},
            "outbound_payments": {
                "ach": {"requested": True},
                "us_domestic_wire": {"requested": True},
            },
            "outbound_transfers": {
                "ach": {"requested": True},
                "us_domestic_wire": {"requested": True},
            },
        },
        stripe_account=account.id,
    )


def rebalance_account_statuses():
    accounts = sorted(
        stripe.Account.list().auto_paging_iter(), key=lambda a: a.created, reverse=True
    )

    # Ensure the first few accounts are protected and with other tags
    demo_account = accounts[0]
    if not is_protected_account(demo_account) and not is_demo_account(demo_account):
        log.info(
            f"Marking account {demo_account.id} / {demo_account.business_profile.name} as protected"
        )
        stripe.Account.modify(
            demo_account.id, metadata={PROTECTED_TAG: "true", DEMO_ACCOUNT_TAG: "true"}
        )

    high_fraud_account = accounts[1]
    if not is_protected_account(high_fraud_account) and not is_high_fraud_account(
        high_fraud_account
    ):
        log.info(
            f"Marking account {high_fraud_account.id} / {high_fraud_account.business_profile.name} as high fraud"
        )
        stripe.Account.modify(
            high_fraud_account.id,
            metadata={
                PROTECTED_TAG: "true",
                HIGH_FRAUD_TAG: "true",
                REJECTED_TAG: "",
                HIGH_FRAUD_TAG: "",
                RESTRICTED_TAG: "",
            },
        )

    elevated_fraud_account = accounts[2]
    if not is_protected_account(
        elevated_fraud_account
    ) and not is_elevated_fraud_account(elevated_fraud_account):
        log.info(
            f"Marking account {elevated_fraud_account.id} / {elevated_fraud_account.business_profile.name} as elevated fraud"
        )
        stripe.Account.modify(
            elevated_fraud_account.id,
            metadata={
                PROTECTED_TAG: "true",
                HIGH_FRAUD_TAG: "",
                REJECTED_TAG: "",
                ELEVATED_FRAUD_TAG: "true",
                RESTRICTED_TAG: "",
            },
        )

    # Get a restricted account on the front page
    restricted_fraud_account = accounts[9]
    if not is_protected_account(restricted_fraud_account) and not is_restricted_account(
        restricted_fraud_account
    ):
        log.info(
            f"Marking account {restricted_fraud_account.id} / {restricted_fraud_account.business_profile.name} as restricted"
        )
        stripe.Account.modify(
            restricted_fraud_account.id,
            metadata={
                PROTECTED_TAG: "true",
                HIGH_FRAUD_TAG: "",
                REJECTED_TAG: "",
                ELEVATED_FRAUD_TAG: "",
                RESTRICTED_TAG: "true",
            },
        )

    # Get a rejected account on the front page
    rejected_account = accounts[14]
    if not is_protected_account(rejected_account) and not is_rejected_account(
        rejected_account
    ):
        log.info(
            f"Marking account {rejected_account.id} / {rejected_account.business_profile.name} as rejected"
        )
        stripe.Account.modify(
            rejected_account.id,
            metadata={
                PROTECTED_TAG: "true",
                HIGH_FRAUD_TAG: "",
                REJECTED_TAG: "true",
                ELEVATED_FRAUD_TAG: "",
                RESTRICTED_TAG: "",
            },
        )

    high_fraud = [a for a in accounts if is_high_fraud_account(a)]
    elevated_fraud = [a for a in accounts if is_elevated_fraud_account(a)]
    rejected = [a for a in accounts if is_rejected_account(a)]
    restricted = [a for a in accounts if is_restricted_account(a)]
    rest = [
        a
        for a in accounts
        if not any(
            [
                is_high_fraud_account(a),
                is_elevated_fraud_account(a),
                is_rejected_account(a),
                is_restricted_account(a),
                is_protected_account(a),
            ]
        )
    ]

    # For now, assume we only _add_ to each category by taking away from the rest
    if len(high_fraud) < HIGH_FRAUD_COUNT:
        to_add = HIGH_FRAUD_COUNT - len(high_fraud)
        log.info(f"Adding {to_add} high fraud accounts")
        for _ in range(to_add):
            random.shuffle(rest)
            account = rest.pop()
            stripe.Account.modify(
                account.id,
                metadata={
                    HIGH_FRAUD_TAG: "true",
                    REJECTED_TAG: "",
                    ELEVATED_FRAUD_TAG: "",
                    RESTRICTED_TAG: "",
                },
            )

    if len(elevated_fraud) < ELEVATED_FRAUD_COUNT:
        to_add = ELEVATED_FRAUD_COUNT - len(elevated_fraud)
        log.info(f"Adding {to_add} elevated fraud accounts")
        for _ in range(to_add):
            random.shuffle(rest)
            account = rest.pop()
            stripe.Account.modify(
                account.id,
                metadata={
                    ELEVATED_FRAUD_TAG: "true",
                    HIGH_FRAUD_TAG: "",
                    REJECTED_TAG: "",
                    RESTRICTED_TAG: "",
                },
            )

    if len(rejected) < REJECTED_COUNT:
        to_add = REJECTED_COUNT - len(rejected)
        log.info(f"Adding {to_add} rejected accounts")
        for _ in range(to_add):
            random.shuffle(rest)
            account = rest.pop()
            stripe.Account.modify(
                account.id,
                metadata={
                    REJECTED_TAG: "true",
                    HIGH_FRAUD_TAG: "",
                    ELEVATED_FRAUD_TAG: "",
                    RESTRICTED_TAG: "",
                },
            )

    if len(restricted) < RESTRICTED_COUNT:
        to_add = RESTRICTED_COUNT - len(restricted)
        log.info(f"Adding {to_add} restricted accounts")
        for _ in range(to_add):
            random.shuffle(rest)
            account = rest.pop()
            stripe.Account.modify(
                account.id,
                metadata={
                    RESTRICTED_TAG: "true",
                    HIGH_FRAUD_TAG: "",
                    REJECTED_TAG: "",
                    ELEVATED_FRAUD_TAG: "",
                },
            )


def update_account_status(account):
    """
    Update the status of a connected account
    """
    assert isinstance(account, stripe.Account)

    if is_restricted_account(account):
        # The account should already be restricted
        if account.business_profile.url == "https://inaccessible.stripe.com":
            return
        log.info(f"Restricting account {account.id}")
        stripe.Account.modify(
            account.id,
            business_profile={
                "url": "https://inaccessible.stripe.com",
                "support_address": {
                    "line1": "address_no_match",
                    "city": "South San Francisco",
                    "state": "CA",
                    "postal_code": "94080",
                },
            },
            company={
                "tax_id": "111111111",
            },
            individual={
                "address": {
                    "line1": "address_no_match",
                },
            },
        )
    elif is_rejected_account(account):
        if not account.payouts_enabled:
            return
        log.info(f"Rejecting account {account.id}")
        stripe.Account.reject(
            account.id,
            reason="fraud",
        )
    elif is_elevated_fraud_account(account):
        pass
    elif is_high_fraud_account(account):
        pass


def ensure_account_configuration(account):
    """
    Ensure some stuff is set up right (manual payouts, etc).
    """
    assert isinstance(account, stripe.Account)

    # Metadata has the right format
    metadata = {}
    metadata_updated = False
    for key in [
        RESTRICTED_TAG,
        PROTECTED_TAG,
        HIGH_FRAUD_TAG,
        ELEVATED_FRAUD_TAG,
        REJECTED_TAG,
        DEMO_ACCOUNT_TAG,
        SUPPORT_TICKET_ADDED_TAG,
    ]:
        if key in account.metadata:
            if account.metadata[key] == "True" or account.metadata[key] == True:
                metadata_updated = True
                # Set to true, the string
                metadata[key] = "true"
            elif account.metadata[key] == "None" or account.metadata[key] == None:
                metadata_updated = True
                # Unset
                metadata[key] = ""

    if is_rejected_account(account):
        metadata_updated = True
        metadata[HIGH_FRAUD_TAG] = ""
        metadata[ELEVATED_FRAUD_TAG] = ""
        metadata[RESTRICTED_TAG] = ""

    elif is_restricted_account(account):
        metadata_updated = True
        metadata[HIGH_FRAUD_TAG] = ""
        metadata[ELEVATED_FRAUD_TAG] = ""
        metadata[REJECTED_TAG] = ""

    elif is_elevated_fraud_account(account):
        metadata_updated = True
        metadata[HIGH_FRAUD_TAG] = ""
        metadata[RESTRICTED_TAG] = ""
        metadata[REJECTED_TAG] = ""

    elif is_high_fraud_account(account):
        metadata_updated = True
        metadata[ELEVATED_FRAUD_TAG] = ""
        metadata[RESTRICTED_TAG] = ""
        metadata[REJECTED_TAG] = ""

    if metadata_updated:
        log.info(f"Updating metadata for {account.id}")
        stripe.Account.modify(
            account.id,
            metadata=metadata,
        )

    # Email is a valid email address
    email = f"{account.individual.first_name.lower()}.{account.individual.last_name.lower()}@{EMAIL_DOMAIN}"
    if account.email != email:
        log.info(f"Updating email for {account.id}")
        stripe.Account.modify(
            account.id,
            email=email,
            individual={"email": email},
        )

    # Manual payouts
    if not account.settings.payouts.schedule.interval == "manual":
        log.info(f"Setting manual payouts for {account.id}")
        stripe.Account.modify(
            account.id,
            settings={
                "payouts": {
                    "schedule": {
                        "interval": "manual",
                    }
                }
            },
        )


def create_charge(account, token):
    assert isinstance(account, stripe.Account)
    assert isinstance(token, str)

    amount = random.randint(5_00, 10_00)
    app_fee = math.ceil(max((amount * 2.9 + 30) * 0.1, amount * 0.1))

    try:
        return stripe.Charge.create(
            amount=amount,
            currency="usd",
            source=token,
            application_fee_amount=app_fee,
            capture=True,
            stripe_account=account.id,
        )
    except stripe.error.CardError as e:
        if e.code == "card_declined" and token == "tok_visa_chargeDeclined":
            # Ignore
            return None

        log.error(f"Got an error creating a charge with token {token}: {e}")
        return None


def generate_charges(account):
    """
    Generate charges for a connected account
    """
    assert isinstance(account, stripe.Account)

    if is_rejected_account(account):
        log.info(f"Skipping charges on rejected account {account.id}")
        # Skip charges on this account
        return

    if is_restricted_account(account):
        # Skip charges on this account if charges are disabled
        if not account.charges_enabled:
            log.info(f"Skipping charges on restricted account {account.id}")
            return

    success_count, dispute_count, decline_count, refund_count = 48, 0, 0, 2

    account_tag = "regular"

    if is_elevated_fraud_account(account):
        account_tag = "elevated fraud"
        success_count, dispute_count, decline_count, refund_count = 41, 1, 5, 3
    elif is_high_fraud_account(account):
        account_tag = "high fraud"
        success_count, dispute_count, decline_count, refund_count = 18, 5, 12, 15

    assert (
        success_count + dispute_count + decline_count + refund_count == 50
    ), "Totals should add up to 50"

    # Get the charges from the last 24 hours.
    charges = list(
        stripe.Charge.list(
            created={"gte": int(time.time()) - (24 * 60 * 60)},
            stripe_account=account.id,
        ).auto_paging_iter()
    )

    disputed_charge_count = len([ch for ch in charges if ch.disputed])
    declined_charge_count = len([ch for ch in charges if ch.status == "failed"])
    refunded_charge_count = len([ch for ch in charges if ch.refunded])
    successful_charge_count = len([ch for ch in charges if ch.status == "succeeded"])

    if is_demo_account(account):
        # Ensure there is at least one dispute and decline on this account.
        dispute_count = (
            dispute_count if disputed_charge_count > 0 else max(dispute_count, 1)
        )
        decline_count = (
            decline_count if declined_charge_count > 0 else max(decline_count, 1)
        )

    disputed_to_add = dispute_count - disputed_charge_count
    declined_to_add = decline_count - declined_charge_count
    refunded_to_add = refund_count - refunded_charge_count
    successful_to_add = success_count - successful_charge_count

    tokens = []
    if disputed_to_add > 0:
        tokens += ["tok_createDispute"] * disputed_to_add
    if declined_to_add > 0:
        tokens += ["tok_visa_chargeDeclined"] * declined_to_add
    if refunded_to_add > 0:
        tokens += ["tok_pendingRefund"] * refunded_to_add
    if successful_to_add > 1:
        tokens += ["tok_bypassPending"] * (successful_to_add - 1)

    # Randomize the order
    random.shuffle(tokens)

    if tokens and tokens[-1] == "tok_bypassPending":
        # The most recent charge should be successful
        tokens += ["tok_bypassPending"]

    if tokens:
        log.info(
            f"Generating {len(tokens)} charges for {account_tag} account {account.id}"
        )
        for token in tokens:
            log.info(f"Creating {token} charge on {account.id}")

            charge = create_charge(account, token)

            if token == "tok_pendingRefund" and charge:
                stripe.Refund.create(
                    charge=charge.id,
                    refund_application_fee=False,
                    stripe_account=account.id,
                )


def generate_payouts(account):
    """
    Generate payouts for a connected account
    """
    assert isinstance(account, stripe.Account)

    # Skip payouts on this account if payouts are disabled
    if not account.payouts_enabled:
        log.info(f"Skipping payouts on account {account.id} as they are disabled")
        return

    log.info(f"Generating payouts for {account.id}")

    # Try to create a single payout, but leave some kind of minimum balance for demoing with
    min_balance = 250_00
    min_payout = 50_00

    # Get the account balance
    balance = stripe.Balance.retrieve(stripe_account=account.id)
    available = balance.available[0].amount
    if available <= min_balance:
        log.info(f"Account {account.id} has insufficient funds for a payout")
        return

    max_payout = available - min_balance
    if max_payout < min_payout:
        log.info(f"Account {account.id} has insufficient funds for a minimum payout")
        return

    # Create a payout

    amount = random.randint(min_payout, max_payout)

    stripe.Payout.create(
        amount=amount,
        currency="usd",
        stripe_account=account.id,
    )


def delete_accounts():
    """
    Delete all connected accounts that are not protected
    """
    accounts = list(stripe.Account.list().auto_paging_iter())
    for account in accounts:
        if is_protected_account(account):
            continue

        log.info(f"Deleting account {account.id}")

        account.delete()


def create_cardholder_and_card(account, financial_account_id):
    assert isinstance(account, stripe.Account)

    first_name = random.choice(FIRST_NAMES)
    last_name = random.choice(LAST_NAMES)

    try:
        cardholder = stripe.issuing.Cardholder.create(
            type="individual",
            name=f"{first_name} {last_name}",
            # Use example.com here, since we don't actually email them
            email=f"{first_name.lower()}.{last_name.lower()}@example.com",
            phone_number="+18888675309",
            billing={
                "address": {
                    "line1": "354 Oyster Point Blvd",
                    "city": "South San Francisco",
                    "state": "CA",
                    "postal_code": "94080",
                    "country": "US",
                },
            },
            individual={
                "first_name": first_name,
                "last_name": last_name,
                "card_issuing": {
                    "user_terms_acceptance": {
                        "date": int(time.time()),
                        "ip": "108.36.155.218",
                    },
                },
            },
            stripe_account=account.id,
        )

        # Mark card inactive 20% of the time
        inactive = random.randint(1, 5) == 1

        return stripe.issuing.Card.create(
            cardholder=cardholder.id,
            currency="usd",
            type="physical",
            status="inactive" if inactive else "active",
            financial_account=financial_account_id,
            shipping={
                "name": cardholder.name,
                "address": {
                    "line1": "354 Oyster Point Blvd",
                    "city": "South San Francisco",
                    "state": "CA",
                    "postal_code": "94080",
                    "country": "US",
                },
            },
            stripe_account=account.id,
        )
    except Exception as e:
        log.error(f"Got an error creating a cardholder: {e}")
        return None


def get_default_financial_account(account):
    """
    Get the default financial account for a connected account
    """
    assert isinstance(account, stripe.Account)

    financial_accounts = list(
        stripe.treasury.FinancialAccount.list(limit=1, stripe_account=account.id)
    )
    return financial_accounts[0]


def generate_cardholders_and_cards(account):
    """
    Generate cardholders and cards for a connected account
    """
    assert isinstance(account, stripe.Account)

    if is_rejected_account(account):
        log.info(f"Skipping cardholder generation on rejected account {account.id}")
        # Skip cardholder generation on this account
        return

    if is_restricted_account(account):
        # Skip cardholder generation on this account if card issuing is disabled
        if account.capabilities.card_issuing != "active":
            log.info(
                f"Skipping cardholder generation on restricted account {account.id}"
            )
            return

    # Get the existing cards
    cards = list(
        stripe.issuing.Card.list(
            stripe_account=account.id,
        ).auto_paging_iter()
    )

    log.info(f"Generating cardholders and cards for {account.id}")

    financial_account = get_default_financial_account(account)
    financial_account_id = financial_account.id

    cards_count = 12

    for _ in range(cards_count - len(cards)):
        create_cardholder_and_card(account, financial_account_id)


def generate_financial_account_transactions(account):
    """
    Generate financial account transactions for a connected account
    """
    assert isinstance(account, stripe.Account)

    log.info(f"Generating financial account transactions for {account.id}")

    financial_account = get_default_financial_account(account)
    financial_account_id = financial_account.id

    transactions = list(
        stripe.treasury.Transaction.list(
            financial_account=financial_account_id,
            stripe_account=account.id,
        ).auto_paging_iter()
    )

    received_credit_count, received_debit_count, card_authorization_count = 24, 14, 2

    actual_received_credit_count = len(
        [t for t in transactions if t.flow_type == "received_credit"]
    )
    actual_received_debit_count = len(
        [t for t in transactions if t.flow_type == "received_debit"]
    )
    actual_card_authorization_count = len(
        [t for t in transactions if t.flow_type == "issuing_authorization"]
    )

    for _ in range(received_credit_count - actual_received_credit_count):
        amount = random.randint(50_00, 1000_00)
        stripe.treasury.ReceivedCredit.TestHelpers.create(
            amount=amount,
            currency="usd",
            financial_account=financial_account_id,
            network="ach",
            initiating_payment_method_details={
                "type": "us_bank_account",
                "us_bank_account": {
                    "account_holder_name": random.choice(EXTERNAL_BUSINESS_NAMES),
                },
            },
            stripe_account=account.id,
        )

    for _ in range(received_debit_count - actual_received_debit_count):
        amount = random.randint(5_00, 100_00)
        stripe.treasury.ReceivedDebit.TestHelpers.create(
            amount=amount,
            currency="usd",
            financial_account=financial_account_id,
            network="ach",
            initiating_payment_method_details={
                "type": "us_bank_account",
                "us_bank_account": {
                    "account_holder_name": random.choice(EXTERNAL_BUSINESS_NAMES),
                },
            },
            stripe_account=account.id,
        )

    cards = list(
        stripe.issuing.Card.list(
            limit=100,
            status="active",
            stripe_account=account.id,
        )
    )

    if cards:
        log.info(f"Generating card authorizations for {account.id}")
        for _ in range(card_authorization_count - actual_card_authorization_count):
            amount = random.randint(5_00, 100_00)

            card = random.choice(cards)

            stripe.issuing.Authorization.TestHelpers.create(
                amount=amount,
                card=card.id,
                stripe_account=account.id,
                merchant_data={
                    "name": random.choice(EXTERNAL_BUSINESS_NAMES),
                },
            )


def generate_support_ticket(account):
    """
    Generate a support ticket for a connected account, but only ever create a single one.
    """
    assert isinstance(account, stripe.Account)

    if has_support_ticket(account):
        return

    log.info(f"Generating support ticket for {account.id}")

    try:
        response = stripe.raw_request(
            "post",
            "/v1/test_helpers/demo/support_ticket",
            account=account.token,
        )

        # TODO - validate the response

        # Mark this account as having a support ticket
        stripe.Account.modify(
            account.id,
            metadata={
                SUPPORT_TICKET_ADDED_TAG: True,
            },
        )
    except stripe.error.StripeError as e:
        log.error(f"Got an error creating a support ticket: {e}")


def main():
    config = dotenv_values(os.path.join(ROOT_DIR, ".env.local"))
    if "STRIPE_SECRET_KEY" not in config:
        raise ValueError("STRIPE_SECRET_KEY is not defined in the environment")

    stripe.api_key = config["STRIPE_SECRET_KEY"]

    # Reset if we need to
    # delete_accounts()

    ensure_accounts()

    rebalance_account_statuses()

    accounts = list(stripe.Account.list().auto_paging_iter())

    for account in accounts:
        resolve_requirements(account)

        ensure_account_configuration(account)

    for account in accounts:
        # Ensure each account has a financial account
        ensure_financial_account(account)

    for account in accounts:
        # Update the status of the account
        update_account_status(account)

    # Update the statuses
    accounts = list(stripe.Account.list().auto_paging_iter())

    for account in accounts:
        # Populate charges
        generate_charges(account)

    for account in accounts:
        # Populate payouts
        generate_payouts(account)

    for account in accounts:
        # Populate cardholders and cards
        generate_cardholders_and_cards(account)

    for account in accounts:
        # Populate financial account transactions
        generate_financial_account_transactions(account)

    for account in accounts:
        # Generate a support ticket
        generate_support_ticket(account)


if __name__ == "__main__":
    main()
