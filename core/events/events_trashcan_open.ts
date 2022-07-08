/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Events fired as a result of trashcan flyout open and close.
 */

/**
 * Events fired as a result of trashcan flyout open and close.
 * @class
 */


import * as registry from '../registry';

import {UiBase} from './events_ui_base';
import * as eventUtils from './utils';


/**
 * Class for a trashcan open event.
 * @alias Blockly.Events.TrashcanOpen
 */
export class TrashcanOpen extends UiBase {
  isOpen?: boolean;
  override type: string;

  /**
   * @param opt_isOpen Whether the trashcan flyout is opening (false if
   *     opening). Undefined for a blank event.
   * @param opt_workspaceId The workspace identifier for this event.
   *    Undefined for a blank event.
   */
  constructor(opt_isOpen?: boolean, opt_workspaceId?: string) {
    super(opt_workspaceId);

    /** Whether the trashcan flyout is opening (false if closing). */
    this.isOpen = opt_isOpen;

    /** Type of this event. */
    this.type = eventUtils.TRASHCAN_OPEN;
  }

  /**
   * Encode the event as JSON.
   * @return JSON representation.
   */
  override toJson(): AnyDuringMigration {
    const json = super.toJson();
    json['isOpen'] = this.isOpen;
    return json;
  }

  /**
   * Decode the JSON event.
   * @param json JSON representation.
   */
  override fromJson(json: AnyDuringMigration) {
    super.fromJson(json);
    this.isOpen = json['isOpen'];
  }
}

registry.register(registry.Type.EVENT, eventUtils.TRASHCAN_OPEN, TrashcanOpen);