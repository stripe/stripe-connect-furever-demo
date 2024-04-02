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
            "email": f"{first_name.lower()}.{last_name.lower()}@example.com",
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
            metadata[HIGH_FRAUD_TAG] = True
        elif tag_weight < (HIGH_FRAUD_COUNT + ELEVATED_FRAUD_COUNT):
            metadata[ELEVATED_FRAUD_TAG] = True
        elif tag_weight < (HIGH_FRAUD_COUNT + ELEVATED_FRAUD_COUNT + REJECTED_COUNT):
            metadata[REJECTED_TAG] = True
        elif tag_weight < (
            HIGH_FRAUD_COUNT + ELEVATED_FRAUD_COUNT + REJECTED_COUNT + RESTRICTED_COUNT
        ):
            metadata[RESTRICTED_TAG] = True

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
                    "amount": 1000000,
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
    log.info(
        f"Marking account {accounts[0].id} / {accounts[0].business_profile.name} as protected"
    )
    stripe.Account.modify(accounts[0].id, metadata={PROTECTED_TAG: True})
    log.info(
        f"Marking account {accounts[1].id} / {accounts[1].business_profile.name} as high fraud"
    )
    stripe.Account.modify(
        accounts[1].id,
        metadata={
            PROTECTED_TAG: True,
            HIGH_FRAUD_TAG: True,
            REJECTED_TAG: None,
            HIGH_FRAUD_TAG: None,
            RESTRICTED_TAG: None,
        },
    )
    log.info(
        f"Marking account {accounts[2].id} / {accounts[2].business_profile.name} as elevated fraud"
    )
    stripe.Account.modify(
        accounts[2].id,
        metadata={
            PROTECTED_TAG: True,
            HIGH_FRAUD_TAG: None,
            REJECTED_TAG: None,
            ELEVATED_FRAUD_TAG: True,
            RESTRICTED_TAG: None,
        },
    )

    # Get a restricted account on the front page
    log.info(
        f"Marking account {accounts[9].id} / {accounts[9].business_profile.name} as rejected"
    )
    stripe.Account.modify(
        accounts[9].id,
        metadata={
            PROTECTED_TAG: True,
            HIGH_FRAUD_TAG: None,
            REJECTED_TAG: True,
            ELEVATED_FRAUD_TAG: None,
            RESTRICTED_TAG: None,
        },
    )

    # Get a rejected account on the front page
    log.info(
        f"Marking account {accounts[14].id} / {accounts[14].business_profile.name} as rejected"
    )
    stripe.Account.modify(
        accounts[14].id,
        metadata={
            PROTECTED_TAG: True,
            HIGH_FRAUD_TAG: None,
            REJECTED_TAG: True,
            ELEVATED_FRAUD_TAG: None,
            RESTRICTED_TAG: None,
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
                    HIGH_FRAUD_TAG: True,
                    REJECTED_TAG: None,
                    ELEVATED_FRAUD_TAG: None,
                    RESTRICTED_TAG: None,
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
                    ELEVATED_FRAUD_TAG: True,
                    HIGH_FRAUD_TAG: None,
                    REJECTED_TAG: None,
                    RESTRICTED_TAG: None,
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
                    REJECTED_TAG: True,
                    HIGH_FRAUD_TAG: None,
                    ELEVATED_FRAUD_TAG: None,
                    RESTRICTED_TAG: None,
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
                    RESTRICTED_TAG: True,
                    HIGH_FRAUD_TAG: None,
                    REJECTED_TAG: None,
                    ELEVATED_FRAUD_TAG: None,
                },
            )


def update_account_status(account):
    """
    Update the status of a connected account
    """
    assert isinstance(account, stripe.Account)

    if is_restricted_account(account):
        # The account should already be restricted
        log.info(f"Account {account.id} is restricted")
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
        log.info(f"Account {account.id} is a rejected account, so doing that")
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

    # 10% of the time, skip
    if random.randint(1, 10) <= 1:
        return None

    amount = random.randint(500, 1000)
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

    if is_elevated_fraud_account(account):
        log.info(f"Generating charge data for elevated fraud account {account.id}")
        success_count, dispute_count, decline_count, refund_count = 41, 1, 5, 3
    elif is_high_fraud_account(account):
        log.info(f"Generating charge data for high fraud account {account.id}")
        success_count, dispute_count, decline_count, refund_count = 18, 5, 12, 15
    else:
        log.info(f"Generating charge data for regular account {account.id}")

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

    successful_charge_count = len([ch for ch in charges if ch.status == "succeeded"])
    successful_to_add = success_count - successful_charge_count
    if successful_to_add > 0:
        log.info(f"Adding {successful_to_add} successful charges to {account.id}")
        for _ in range(successful_to_add):
            create_charge(account, "tok_bypassPending")

    disputed_charge_count = len([ch for ch in charges if ch.disputed])
    disputed_to_add = dispute_count - disputed_charge_count
    if disputed_to_add > 0:
        log.info(f"Adding {disputed_to_add} disputed charges to {account.id}")
        for _ in range(disputed_to_add):
            create_charge(account, "tok_createDispute")

    declined_charge_count = len([ch for ch in charges if ch.status == "failed"])
    declined_to_add = decline_count - declined_charge_count
    if declined_to_add > 0:
        log.info(f"Adding {declined_to_add} declined charges to {account.id}")
        for _ in range(declined_to_add):
            create_charge(account, "tok_visa_chargeDeclined")

    refunded_charge_count = len([ch for ch in charges if ch.refunded])
    refunded_to_add = refund_count - refunded_charge_count
    if refunded_to_add > 0:
        log.info(f"Adding {refunded_to_add} refunded charges to {account.id}")
        for _ in range(refunded_to_add):
            charge = create_charge(account, "tok_pendingRefund")

            if charge:
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

    log.info(f"Generating payouts for {account.id}")


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
        if not account.capabilities.card_issuing:
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
        amount = random.randint(5000, 100000)
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
        amount = random.randint(500, 10000)
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

    for _ in range(card_authorization_count - actual_card_authorization_count):
        amount = random.randint(500, 10000)
        cards = list(
            stripe.issuing.Card.list(
                limit=100,
                status="active",
                stripe_account=account.id,
            )
        )
        card = random.choice(cards)

        stripe.issuing.Authorization.TestHelpers.create(
            amount=amount,
            card=card.id,
            stripe_account=account.id,
            merchant_data={
                "name": random.choice(EXTERNAL_BUSINESS_NAMES),
            },
        )


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


if __name__ == "__main__":
    main()
